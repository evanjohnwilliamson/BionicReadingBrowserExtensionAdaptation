document.addEventListener('DOMContentLoaded', () => {
  const enableButton = document.getElementById('enableButton');
  const disableButton = document.getElementById('disableButton');

  chrome.runtime.sendMessage({ action: 'getEnabledStatus' }, (response) => {
    if (response.enabled) {
      enableButton.style.display = 'none';
      disableButton.style.display = 'block';
    } else {
      enableButton.style.display = 'block';
      disableButton.style.display = 'none';
    }
  });

  enableButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'setEnabledStatus', enabled: true });
    enableButton.style.display = 'none';
    disableButton.style.display = 'block';
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({ target: { tabId: tabs[0].id }, files: ['inject.js'] }, () => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'enableBionicReading' });
      });
    });
  });

  disableButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'setEnabledStatus', enabled: false });
    enableButton.style.display = 'block';
    disableButton.style.display = 'none';
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'disableBionicReading' });
    });
  });
});
