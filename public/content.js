chrome.storage.sync.get(["blockedSites"], (data) => {
    const blockedPatterns = data.blockedSites || [];
    blockedPatterns.forEach((pattern) => {
      document.querySelectorAll(pattern).forEach((ad) => ad.remove());
    });
    chrome.storage.sync.set({ blockedAds: blockedPatterns.length });
  });
  