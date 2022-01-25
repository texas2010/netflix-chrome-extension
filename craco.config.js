const path = require('path');

const rewireEntries = [
  {
    name: 'popup',
    entry: path.resolve(__dirname, './src/popup/index.ts'),
    template: path.resolve(__dirname, './src/popup/index.html'),
    outPath: 'popup.html',
  },
  {
    name: 'options',
    entry: path.resolve(__dirname, './src/options/index.ts'),
    template: path.resolve(__dirname, './src/options/index.html'),
    outPath: 'options.html',
  },
  {
    name: 'background',
    entry: path.resolve(__dirname, './src/background/index.ts'),
    template: path.resolve(__dirname, './public/index.html'),
    outPath: 'ignore-this/background.html',
  },
  {
    name: 'contentScript',
    entry: path.resolve(__dirname, './src/contentScript/index.ts'),
    template: path.resolve(__dirname, './public/index.html'),
    outPath: 'ignore-this/contentScript.html',
  },
];

// background: './src/background/index.ts',
// contentScript: './src/contentScript/index.ts',
// options: './src/options/index.ts',
// popup: './src/popup/index.ts',

const defaultEntryName = 'main';

const appIndexes = ['js', 'tsx', 'ts', 'jsx'].map((ext) =>
  path.resolve(__dirname, `src/index.${ext}`)
);

function webpackMultipleEntries(config, paths) {
  // Multiple Entry JS
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
  // console.log(config.output);
  return config;
}

module.exports = {
  webpack: {
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
};
