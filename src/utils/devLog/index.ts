export const emptyArg = 'argument required';

const devLog = (callback: () => {}) => {
  if (!callback) {
    throw new Error(emptyArg);
  }
};

export default devLog;
