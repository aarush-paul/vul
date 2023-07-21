// script.js
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';

document.getElementById('appForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const appName = document.getElementById('appName').value;
  const checkType = document.getElementById('checkType').value;

  if (checkType === 'vulnerabilities') {
    checkVulnerabilities(appName);
  } else if (checkType === 'availability') {
    checkAvailability(appName);
  }
});

function checkVulnerabilities(appName) {
  // Code to fetch vulnerability information from NVD or other vulnerability databases
  // Display results in the 'results' div
}

function checkAvailability(appName) {
  fetch(`${PROXY_URL}https://downforeveryoneorjustme.com/${encodeURIComponent(appName)}`)
    .then(response => response.text())
    .then(html => {
      const isDown = html.includes('It\'s just you.');
      displayAvailabilityResult(isDown);
    })
    .catch(error => console.error('Error checking availability:', error));
}

function displayResults(vulnerabilities) {
  // Code to display vulnerability results
}

function displayAvailabilityResult(isDown) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  const statusMessage = isDown ? 'The app is currently down.' : 'The app is up and running!';
  resultsDiv.textContent = statusMessage;
}
