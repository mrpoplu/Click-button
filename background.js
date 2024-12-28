chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed.');
  });
  
  // Listen for messages from popup to control automation
  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === 'start') {
      chrome.storage.local.set({ automationRunning: true });
      startAutomationInTab();
    } else if (message.action === 'stop') {
      chrome.storage.local.set({ automationRunning: false });
      stopAutomationInTab();
    }
  });
  
  function startAutomationInTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => { document.dispatchEvent(new CustomEvent('startAutomation')) }
      });
    });
  }
  
  function stopAutomationInTab() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => { document.dispatchEvent(new CustomEvent('stopAutomation')) }
      });
    });
  }
  
  // Check automation state when the extension is loaded
  chrome.runtime.onStartup.addListener(() => {
    chrome.storage.local.get('automationRunning', (result) => {
      if (result.automationRunning) {
        startAutomationInTab();
      }
    });
  });
  