// @ts-nocheck

export const chromeRuntimeMock = {
  getURL(filePath) {
    if (typeof filePath !== 'string') {
      throw new Error('argument is required');
    }
    return `chrome-extension://EXTENSION_DIR/${filePath}`;
  },
};
