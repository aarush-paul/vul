// script.js
const VULNERABILITIES_API_URL = 'https://vul-server.vercel.app/api/vulnerabilities'; // Update with your server's API URL

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
  fetch(`${VULNERABILITIES_API_URL}/${encodeURIComponent(appName)}`)
    .then(response => response.json())
    .then(data => displayResults(data))
    .catch(error => console.error('Error fetching vulnerability data:', error));
}

function checkAvailability(appName) {
  // Code to check app availability status
}

function displayResults(vulnerabilities) {
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  if (vulnerabilities.length === 0) {
    resultsDiv.textContent = 'No vulnerabilities found for the provided app.';
    return;
  }

  vulnerabilities.forEach(vulnerability => {
    const div = document.createElement('div');
    div.innerHTML = `
      <h2>${vulnerability.cve.CVE_data_meta.ID}</h2>
      <p>Description: ${vulnerability.cve.description.description_data[0].value}</p>
      <p>Severity: ${vulnerability.impact.baseMetricV2.cvssV2.baseScore}</p>
      <hr>
    `;
    resultsDiv.appendChild(div);
  });
}
