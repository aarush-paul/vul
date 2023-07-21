function checkStatus() {
    const appURL = document.getElementById('appURL').value;

    fetch(`https://isitup.org/${appURL}.json`)
        .then(response => response.json())
        .then(data => {
            if (data.status_code === 1) {
                document.getElementById('status').textContent = "The app is UP and running!";
            } else if (data.status_code === 2) {
                document.getElementById('status').textContent = "The app is DOWN!";
            } else {
                document.getElementById('status').textContent = "Error checking app status.";
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('status').textContent = "Error checking app status.";
        });
}
