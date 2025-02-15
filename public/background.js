let activeTab = null;
let startTime = null;
let timeSpent = {};

chrome.tabs.onActivated.addListener((activeInfo) => {
  if (activeTab) {
    const duration = Date.now() - startTime;
    timeSpent[activeTab] = (timeSpent[activeTab] || 0) + duration;
  }

  chrome.tabs.get(activeInfo.tabId, (tab) => {
    activeTab = new URL(tab.url).hostname;
    startTime = Date.now();
  });

  chrome.storage.sync.set({ timeSpent });
});
