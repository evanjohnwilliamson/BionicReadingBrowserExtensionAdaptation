(async function () {
  async function loadScript(url) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = url;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  await loadScript('https://unpkg.com/compromise@latest/builds/compromise.js');
  await loadScript('https://unpkg.com/compromise-nouns@latest/builds/compromise-nouns.js');
  await loadScript('https://unpkg.com/compromise-adjectives@latest/builds/compromise-adjectives.js');
  await loadScript('https://unpkg.com/compromise-verbs@latest/builds/compromise-verbs.js');
})();
