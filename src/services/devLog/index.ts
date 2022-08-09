export const error = { emptyArg: 'argument required' };

export const devLog = (...args: any) => {
  if (!args.length) {
    throw new Error(error.emptyArg);
  }
  chrome.storage.local.get(['userSettings'], (result) => {
    if (result) {
      const userSettingDevEnable = result.userSettings.devLog;

      if (userSettingDevEnable) {
        console.log(...args);
        return;
      }
    }
    return;
  });
  if (
    process.env.NODE_ENV === 'production' ||
    process.env.NODE_ENV === 'test'
  ) {
    return;
  }
  console.log(...args);
  return;
};
