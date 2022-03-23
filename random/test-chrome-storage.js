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

// test('should get data from chrome storage', () => {
//   const input = 'only data';
//   console.log(input);

//   // localStorage.setItem('user', input);
//   chrome.storage.sync.set(
//     {
//       user: input,
//     },
//     () => {
//       console.log('it saved!');
//     }
//   );

//   expect(devLog('test')).toBe(input);
// });
