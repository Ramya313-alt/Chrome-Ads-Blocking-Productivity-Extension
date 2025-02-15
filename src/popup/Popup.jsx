import { useState, useEffect } from "react";
import "./Popup.css";

function Popup() {
  const [blockedCount, setBlockedCount] = useState(0);
  const [notes, setNotes] = useState([]);
  const [timeSpent, setTimeSpent] = useState({});

  useEffect(() => {
    chrome.storage.sync.get(["blockedAds", "timeSpent", "notes"], (data) => {
      setBlockedCount(data.blockedAds || 0);
      setTimeSpent(data.timeSpent || {});
      setNotes(data.notes || []);
    });
  }, []);

  const addNote = () => {
    const note = prompt("Enter a note:");
    if (note) {
      const updatedNotes = [...notes, note];
      setNotes(updatedNotes);
      chrome.storage.sync.set({ notes: updatedNotes });
    }
  };
  const groupTabs = () => {
    chrome.tabs.query({}, (tabs) => {
      const categories = { social: [], work: [], misc: [] };
  
      tabs.forEach((tab) => {
        if (tab.url.includes("facebook") || tab.url.includes("twitter")) {
          categories.social.push(tab.id);
        } else if (tab.url.includes("github") || tab.url.includes("notion")) {
          categories.work.push(tab.id);
        } else {
          categories.misc.push(tab.id);
        }
      });
  
      Object.values(categories).forEach((group) => {
        if (group.length > 1) {
          chrome.tabs.group({ tabIds: group });
        }
      });
    });
  };
  

  return (
    <div className="popup-container">
      <h2 style={{padding:"10px", color:"blue"}}>Productivity Extension </h2>

      <div className="section">
        <h3>Ad Blocker</h3>
        <p>Blocked Ads: {blockedCount}</p>
      </div>

      <div className="section">
        <h3 style={{textDecoration:"underline", color:"black"}}>Productivity Tracker</h3>
        <ul style={{color:"red"}}>
          {Object.entries(timeSpent).map(([site, time]) => (
            <li key={site}>
              {site}: {Math.round(time / 1000)} sec
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h3>Smart Notes</h3>
        <button onClick={addNote}>Add Note</button>
        <ul>
          {notes.map((note, idx) => (
            <li key={idx}>{note}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Popup;
