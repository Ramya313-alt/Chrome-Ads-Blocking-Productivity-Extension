export const saveNote = (note) => {
    chrome.storage.sync.get(["notes"], (data) => {
      const notes = [...(data.notes || []), note];
      chrome.storage.sync.set({ notes });
    });
  };
  