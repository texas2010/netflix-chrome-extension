export const error = { emptyArg: 'argument required' };

const devLog = (...args: any) => {
  if (!args.length) {
    throw new Error(error.emptyArg);
  }
  chrome.storage.local.get(['userSettings'], (result) => {
    if (result) {
      const userSettingDevEnable = result.userSettings.dev;

      if (userSettingDevEnable) {
        console.log(...args);
        return;
      }
    }
    return;
  });
  if (process.env.NODE_ENV === 'production') {
    return;
  }
  console.log(...args);
  return;
};

export default devLog;
