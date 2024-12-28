let interval;

function startAutomation() {
  console.log('Automation started');
  interval = setInterval(() => {
    const joinButton = document.querySelector('#group-join-button');
    if (joinButton) {
      joinButton.click();
      console.log('Join button clicked!');
      setTimeout(lookForCancelButton, 180000); // Wait for 3 minutes
    } else {
      console.log('Join button not found.');
    }
  }, 1000);
}

function lookForCancelButton() {
  console.log('Looking for the Cancel button...');
  const cancelButton = Array.from(document.querySelectorAll('button')).find(
    (btn) => btn.textContent.trim() === 'Cancel Request'
  );
  if (cancelButton) {
    cancelButton.click();
    console.log('Cancel button clicked!');
    setTimeout(startAutomation, 5000); // Wait for 5 seconds before restarting
  } else {
    console.log('Cancel button not found, retrying...');
    setTimeout(lookForCancelButton, 1000);
  }
}

function stopAutomation() {
  clearInterval(interval);
  console.log('Automation stopped.');
}

// Listen for custom events to start or stop automation
document.addEventListener('startAutomation', startAutomation);
document.addEventListener('stopAutomation', stopAutomation);

// Listen for messages from the background script to control automation
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'start') {
    startAutomation();
  } else if (message.action === 'stop') {
    stopAutomation();
  }
});
