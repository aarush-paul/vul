function checkStatus() {
    const appURL = document.getElementById('appURL').value;

    fetch(`https://api.downfor.cloud/httpcheck/${appURL}`)
        .then(response => response.json())
        .then(data => {
            const status = data.is_down ? "The app is DOWN!" : "The app is UP and running!";
            document.getElementById('status').textContent = status;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('status').textContent = "Error checking app status.";
        });
}
