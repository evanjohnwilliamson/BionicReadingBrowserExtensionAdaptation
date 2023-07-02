function emphasizeBionics(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    const nlp = window.nlp.extend(window.nlp_compromise);
    const text = node.textContent;
    const doc = nlp(text);
    const bionics = doc.out('tags').reduce((acc, word) => {
      if (word.tags.includes('Noun') || word.tags.includes('Verb') || word.tags.includes('Adjective')) {
        acc.push(word.text);
      }
      return acc;
    }, []);

    console.log('Bionics:', bionics); // Debugging line

    let newText = text;
    bionics.forEach((bionic) => {
      const bionicWithEmphasis = `<span class="bionic">${bionic}</span>`;
      newText = newText.replace(new RegExp(`\\b${bionic}\\b`, 'g'), bionicWithEmphasis);
    });

    const replacementNode = document.createElement('span');
    replacementNode.innerHTML = newText;
    node.replaceWith(replacementNode);
  } else {
    node.childNodes.forEach((child) => emphasizeBionics(child));
  }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'toggleBionicReading') {
    console.log('Toggling Bionic Reading...'); // Debugging line
    emphasizeBionics(document.body);
  }
});
