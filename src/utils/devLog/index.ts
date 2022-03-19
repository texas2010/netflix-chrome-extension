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
};

export default devLog;

// let final = 'local storage is not work at all';
// const data = localStorage.getItem('user');
// if (data) {
//   return data;
// }
// return final;
// let final = 'chrome is not work at all';
// chrome.storage.sync.get('user', (result) => {
//   console.log('result', result);

//   if (result) {
//     final = result.user;
//     return;
//   }
//   final = 'error';
// });
// return final;
