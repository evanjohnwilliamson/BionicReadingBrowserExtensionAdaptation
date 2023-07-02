function wrapBionics(text) {
  return text.replace(/(\b\w{2})/g, '<span class="bionic-emphasis">$1</span>');
}

function processSelectedText() {
  const selectedText = window.getSelection();
  const range = selectedText.getRangeAt(0);
  const newNode = document.createElement('span');
  newNode.innerHTML = wrapBionics(range.toString());
  range.deleteContents();
  range.insertNode(newNode);
}

function injectStyles() {
  const style = document.createElement('style');
  style.textContent = '.bionic-emphasis { font-weight: bold; }';
  document.head.append(style);
}

chrome.storage.sync.get('enabled', (data) => {
  if (data.enabled) {
    injectStyles();
    document.addEventListener('mouseup', (e) => {
      if (window.getSelection().toString().length > 0) {
        processSelectedText();
      }
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'enableBionicReading') {
    injectStyles();
    document.addEventListener('mouseup', (e) => {
      if (window.getSelection().toString().length > 0) {
        processSelectedText();
      }
    });
  } else if (request.action === 'disableBionicReading') {
    location.reload();
  }
});
