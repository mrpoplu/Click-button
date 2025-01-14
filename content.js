console.log('started')
let interval;

function startAutomation() {
  console.log('Automation started');
  interval = setInterval(() => {
    const joinButton = document.querySelector('#group-join-button');
    if (joinButton) {
      joinButton.click();
      console.log('Join button clicked!');
      // Wait for 3 minutes before looking for the Cancel Request button
      setTimeout(lookForCancelButton, 180000);
    } else {
      console.log('Join button not found.');
    }
  }, 1000); // Check for the Join button every second
}

function lookForCancelButton() {
  console.log('Looking for the Cancel button...');
  const cancelButton = Array.from(document.querySelectorAll('button')).find(
    (btn) => btn.textContent.trim() === 'Cancel Request'
  );
  if (cancelButton) {
    cancelButton.click();
    console.log('Cancel button clicked!');
    // Wait for 5 seconds before restarting the automation process
    setTimeout(startAutomation, 5000);
  } else {
    console.log('Cancel button not found. Retrying...');
    // Retry every second until the Cancel button is found
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
    if (!interval) { // Prevent starting automation if it's already running
      startAutomation();
    } else {
      console.log('Automation is already running.');
    }
  } else if (message.action === 'stop') {
    if (interval) {
      stopAutomation();
    } else {
      console.log('Automation is not running.');
    }
  }
});
