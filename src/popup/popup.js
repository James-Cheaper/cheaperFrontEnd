/* eslint-disable no-console */

console.log('[Popup] Popup script loaded');

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  if (root) {
    root.textContent = 'Hello from the popup!';
  }
});