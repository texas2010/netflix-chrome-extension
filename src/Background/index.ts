import 'emoji-log';
// eslint-disable-next-line prettier/prettier
import { browser } from 'webextension-polyfill-ts';

browser.runtime.onInstalled.addListener((): void => {
  console.emoji('🦄', 'extension installed');
});
