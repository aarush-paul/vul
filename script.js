// script.js
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
	fetch(`https://services.nvd.nist.gov/rest/json/cves/1.0?keyword=${encodeURIComponent(appName)}`)
	  .then(response => response.json())
	  .then(data => displayResults(data.cves))
	  .catch(error => console.error('Error fetching vulnerability data:', error));
  }
  
  function checkAvailability(appName) {
	const url = `https://downforeveryoneorjustme.com/${encodeURIComponent(appName)}`;
  
	fetch(url)
	  .then(response => response.text())
	  .then(html => {
		const isDown = html.includes('It\'s just you.');
		displayAvailabilityResult(isDown);
	  })
	  .catch(error => console.error('Error checking availability:', error));
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
  
  function displayAvailabilityResult(isDown) {
	const resultsDiv = document.getElementById('results');
	resultsDiv.innerHTML = '';
  
	const statusMessage = isDown ? 'The app is currently down.' : 'The app is up and running!';
	resultsDiv.textContent = statusMessage;
  }
  