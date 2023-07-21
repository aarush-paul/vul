// script.js
let apiKey; // Variable to store the API key

document.getElementById('appForm').addEventListener('submit', function (event) {
  event.preventDefault();
  const appName = document.getElementById('appName').value;
  fetchAppReport(appName);
});

// Function to fetch the API key (Assuming you have a way to generate/get the API key)
function getAPIKey() {
  // Replace this with your logic to fetch or generate the API key
  // For simplicity, let's assume there's a function that returns the key
  return "YOUR_API_KEY";
}

// Function to refresh the API key every hour
function refreshAPIKey() {
  apiKey = getAPIKey();
}

// Fetch the initial API key and start the key refresh process
refreshAPIKey();
setInterval(refreshAPIKey, 60 * 60 * 1000); // Refresh the API key every hour

function fetchAppReport(appName) {
  const reportDiv = document.getElementById('report');
  reportDiv.innerHTML = 'Loading...';

  // Fetch actual data from the DownDetector API using the current API key
  fetch(`https://api.downdetector.com/v1/reports/${appName}?apikey=${apiKey}`)
    .then(response => response.json())
    .then(reportData => {
      displayReport(reportData);
      displayMostReportedProblems(reportData.mostReportedProblems);
      displayOutageGraph(reportData.outageGraphData);
    })
    .catch(error => {
      console.error('Error fetching app report:', error);
      reportDiv.innerHTML = 'Error fetching app report.';
    });
}

function displayReport(reportData) {
  const reportDiv = document.getElementById('report');
  reportDiv.innerHTML = `
    <h2>${reportData.name} Report</h2>
    <p>Status: ${reportData.status}</p>
    <p>Outages: ${reportData.outages}</p>
    <p>Downvotes: ${reportData.downvotes}</p>
    <p>Upvotes: ${reportData.upvotes}</p>
  `;

  reportDiv.style.display = 'block';
}

function displayMostReportedProblems(mostReportedProblems) {
  const problemsDiv = document.getElementById('problems');
  problemsDiv.innerHTML = '<h2>Most Reported Problems</h2>';

  mostReportedProblems.forEach(problem => {
    const p = document.createElement('p');
    p.textContent = `${problem.name}: ${problem.count} reports`;
    problemsDiv.appendChild(p);
  });
}

function displayOutageGraph(graphData) {
  const graphCanvas = document.getElementById('outageGraph');
  graphCanvas.innerHTML = '<h2>Outage Graph</h2>';

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
