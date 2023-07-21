// script.js
document.getElementById('appForm').addEventListener('submit', function (event) {
	event.preventDefault();
	const appName = document.getElementById('appName').value;
	fetchServiceStatus(appName);
  });
  
  function fetchServiceStatus(appName) {
	const reportDiv = document.getElementById('report');
	const statusParagraph = document.getElementById('status');
	reportDiv.style.display = 'block';
	statusParagraph.textContent = 'Loading...';
  
	// Fetch service status from the istheservicedown.in API
	fetch(`https://istheservicedown.in/api/${appName}.json`)
	  .then(response => response.json())
	  .then(data => {
		const { status } = data;
		statusParagraph.textContent = `Service is ${status ? 'down' : 'up'}!`;
	  })
	  .catch(error => {
		console.error('Error fetching service status:', error);
		statusParagraph.textContent = 'Error fetching service status.';
	  });
  }
  