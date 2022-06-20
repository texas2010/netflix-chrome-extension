const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const rewireEntries = [
  {
    name: 'popup',
    entry: path.resolve(__dirname, 'src', 'popup', 'index.tsx'),
    template: path.resolve(__dirname, 'public', 'index.html'),
    outPath: 'popup.html',
  },
  {
    name: 'options',
    entry: path.resolve(__dirname, 'src', 'options', 'index.tsx'),
    template: path.resolve(__dirname, 'public', 'index.html'),
    outPath: 'options.html',
  },
  {
    name: 'background',
    entry: path.resolve(__dirname, 'src', 'background', 'index.ts'),
    template: path.resolve(__dirname, 'public', 'index.html'),
    outPath: 'ignore-this/background.html',
  },
  {
    name: 'content-scripts',
    entry: path.resolve(__dirname, 'src', 'content-scripts', 'index.ts'),
    template: path.resolve(__dirname, 'public', 'index.html'),
    outPath: 'ignore-this/content-scripts.html',
  },
  {
    name: 'inject-script',
    entry: path.resolve(__dirname, 'src', 'inject-script', 'index.ts'),
    template: path.resolve(__dirname, 'public', 'index.html'),
    outPath: 'ignore-this/inject-script.html',
  },
];

const defaultEntryName = 'main';

const appIndexes = ['js', 'tsx', 'ts', 'jsx'].map((ext) =>
  path.resolve(__dirname, `src/index.${ext}`)
);

function webpackMultipleEntries(config) {
  // Multiple Entry JS
  config.plugins.forEach((plugin) => {
    if (plugin.constructor.name === 'MiniCssExtractPlugin') {
      plugin.options.filename = 'static/css/[name].css';
    }
  });
  const defaultEntryHTMLPlugin = config.plugins.filter((plugin) => {
    return plugin.constructor.name === 'HtmlWebpackPlugin';
  })[0];
  defaultEntryHTMLPlugin.userOptions.chunks = [defaultEntryName];

  // config.entry is not an array in Create React App 4
  if (!Array.isArray(config.entry)) {
    config.entry = [config.entry];
  }

  // If there is only one entry file then it should not be necessary for the rest of the entries
  const necessaryEntry =
    config.entry.length === 1
      ? []
      : config.entry.filter((file) => !appIndexes.includes(file));
  const multipleEntry = {};
  multipleEntry[defaultEntryName] = config.entry;

  rewireEntries.forEach((entry) => {
    multipleEntry[entry.name] = necessaryEntry.concat(entry.entry);
    // Multiple Entry HTML Plugin
    config.plugins.unshift(
      new defaultEntryHTMLPlugin.constructor(
        Object.assign({}, defaultEntryHTMLPlugin.userOptions, {
          filename: entry.outPath,
          template: entry.template,
          chunks: [entry.name],
        })
      )
    );
  });
  config.entry = multipleEntry;

  // Multiple Entry Output File
  let names = config.output.filename.split('/').reverse();

  if (names[0].indexOf('[name]') === -1) {
    names[0] = '[name].' + names[0];
    config.output.filename = names.reverse().join('/');
  }
  return config;
}

module.exports = {
  webpack: {
    alias: {
      '@app': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src', 'assets'),
      '@components': path.resolve(__dirname, 'src', 'components'),
      '@hooks': path.resolve(__dirname, 'src', 'hooks'),
      '@services': path.resolve(__dirname, 'src', 'services'),
      '@types': path.resolve(__dirname, 'src', 'types'),
      '@utils': path.resolve(__dirname, 'src', 'utils'),
      '@background': path.resolve(__dirname, 'src', 'background'),
      '@content-scripts': path.resolve(__dirname, 'src', 'content-scripts'),
      '@inject-script': path.resolve(__dirname, 'src', 'inject-script'),
      '@options': path.resolve(__dirname, 'src', 'options'),
      '@popup': path.resolve(__dirname, 'src', 'popup'),
    },
    plugins: {
      add: [
        new CopyPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, 'src', 'assets'),
              to: path.resolve(__dirname, 'build', 'assets'),
            },
          ],
        }),
      ],
    },
    configure: (webpackConfig, { env, paths }) => {
      const newWebpackConfig = webpackMultipleEntries(webpackConfig);
      return {
        ...newWebpackConfig,
        entry: {
          ...newWebpackConfig.entry,
        },
        output: {
          ...newWebpackConfig.output,
          filename: 'static/js/[name].js',
        },
        optimization: {
          ...newWebpackConfig.optimization,
          runtimeChunk: false,
        },
      };
    },
  },
  devServer: {
    devMiddleware: {
      writeToDisk: true,
    },
  },
};
