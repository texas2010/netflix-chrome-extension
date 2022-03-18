export const error = { emptyArg: 'argument required' };

const devLog = (callback: Function) => {
  if (!callback) {
    throw new Error(error.emptyArg);
  }
  const userSettingDevEnable = true;

  if (process.env.NODE_ENV === 'production' && !userSettingDevEnable) {
    return;
  }
  callback();
};

export default devLog;
