chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "toggleBionicReading") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { message: "toggleBionicReading" });
    });
  }

  if (request.action === 'getEnabledStatus') {
    chrome.storage.sync.get('enabled', (data) => {
      sendResponse({ enabled: data.enabled });
    });
    return true;
  }

  if (request.action === 'setEnabledStatus') {
    chrome.storage.sync.set({ enabled: request.enabled });
  }
});
