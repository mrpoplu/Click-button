document.getElementById('start-stop').addEventListener('click', async () => {
    // Send a message to background.js to start automation
    chrome.runtime.sendMessage({ action: 'start' });
  
    // Hide the start button and show stop button
    document.getElementById('start-stop').style.display = 'none';
    document.getElementById('stop').style.display = 'block';
  });
  
  document.getElementById('stop').addEventListener('click', async () => {
    // Send a message to background.js to stop automation
    chrome.runtime.sendMessage({ action: 'stop' });
  
    // Hide the stop button and show start button
    document.getElementById('stop').style.display = 'none';
    document.getElementById('start-stop').style.display = 'block';
  });
  