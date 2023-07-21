// script.js
document.getElementById('appForm').addEventListener('submit', function (event) {
	event.preventDefault();
	const appName = document.getElementById('appName').value;
	fetchAppReport(appName);
  });
  
  function fetchAppReport(appName) {
	const reportDiv = document.getElementById('report');
	reportDiv.innerHTML = 'Loading...';
  
	// Fetch actual data from the DownDetector API or other sources
	// In this example, we'll use sample data
	const reportData = getSampleReportData(appName);
  
	displayReport(reportData);
	displayMostReportedProblems(reportData.mostReportedProblems);
	displayOutageGraph(reportData.outageGraphData);
  }
  
  function getSampleReportData(appName) {
	// Sample data for the report
	return {
	  appName,
	  status: 'Operational',
	  issues: 'No known issues',
	  outage: 'No recent outage reported',
	  lastUpdated: new Date().toLocaleString(),
	  mostReportedProblems: [
		{ problem: 'Login issues', count: 56 },
		{ problem: 'Streaming problems', count: 34 },
		{ problem: 'App crashes', count: 23 },
		{ problem: 'Playback error', count: 19 },
		{ problem: 'Search not working', count: 15 },
	  ],
	  outageGraphData: {
		labels: ['9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM'],
		datasets: [
		  {
			label: 'Spotify Outage',
			data: [0, 0, 0, 0, 1, 0, 0],
			borderColor: 'rgba(75, 192, 192, 1)',
			backgroundColor: 'rgba(75, 192, 192, 0.2)',
			borderWidth: 2,
		  },
		],
	  },
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
  
  function displayMostReportedProblems(mostReportedProblems) {
	const problemsDiv = document.getElementById('problems');
	problemsDiv.innerHTML = '<h2>Most Reported Problems</h2>';
  
	mostReportedProblems.forEach(problem => {
	  const p = document.createElement('p');
	  p.textContent = `${problem.problem}: ${problem.count} reports`;
	  problemsDiv.appendChild(p);
	});
  }
  
  function displayOutageGraph(graphData) {
	const graphCanvas = document.getElementById('outageGraph');
	graphCanvas.innerHTML = '<h2>Spotify Outage Graph</h2>';
  
	new Chart(graphCanvas, {
	  type: 'line',
	  data: graphData,
	  options: {
		scales: {
		  y: {
			beginAtZero: true,
		  },
		},
	  },
	});
  }
  