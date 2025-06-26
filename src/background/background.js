/* global chrome */
/* eslint-disable no-console */

console.log('[Background] Loaded background script');

if (typeof chrome !== 'undefined' && chrome.runtime?.onInstalled) {
  chrome.runtime.onInstalled.addListener(() => {
    console.log('[Background] Extension installed');
  });
}