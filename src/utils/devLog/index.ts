export const error = { emptyArg: 'argument required' };

const devLog = (callback: Function) => {
  if (!callback) {
    throw new Error(error.emptyArg);
  }
  let userSettingDevEnable;
  chrome.storage.local.get(['userSettings'], (result) => {
    if (result) {
      userSettingDevEnable = result.userSettings.dev;
    }
  });

  if (process.env.NODE_ENV === 'production' && !userSettingDevEnable) {
    return;
  }
  callback();
};

export default devLog;
