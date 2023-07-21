// script.js
document.getElementById('appForm').addEventListener('submit', function (event) {
	event.preventDefault();
	const appName = document.getElementById('appName').value;
	fetchAppReport(appName);
  });
  
  function fetchAppReport(appName) {
	const reportDiv = document.getElementById('report');
	reportDiv.innerHTML = 'Loading...';
  
	// Use DownDetector API or other sources to fetch the report data
	// In this example, we'll just display a sample report
	const reportData = getSampleReportData(appName);
  
	displayReport(reportData);
  }
  
  function getSampleReportData(appName) {
	// Replace this with the actual data from the DownDetector API or other sources
	return {
	  appName,
	  status: 'Operational',
	  issues: 'No known issues',
	  outage: 'No recent outage reported',
	  lastUpdated: new Date().toLocaleString()
	};
  }
  
  function displayReport(reportData) {
	const reportDiv = document.getElementById('report');
	reportDiv.innerHTML = `
	  <h2>${reportData.appName} Report</h2>
	  <p>Status: ${reportData.status}</p>
	  <p>Issues: ${reportData.issues}</p>
	  <p>Outage: ${reportData.outage}</p>
	  <p>Last Updated: ${reportData.lastUpdated}</p>
	`;
  
	reportDiv.style.display = 'block';
  }
  