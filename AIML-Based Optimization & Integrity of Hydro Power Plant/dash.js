// Simulated real-time updates for dashboard values
function updateDashboard() {
    const powerOutputElement = document.getElementById('power-output');
    const waterFlowElement = document.getElementById('water-flow');

    // Generate random values to simulate real-time updates
    const newPowerOutput = (480 + Math.random() * 40).toFixed(1); // Random between 480-520 MW
    const newWaterFlow = (290 + Math.random() * 20).toFixed(1); // Random between 290-310 m³/s

    powerOutputElement.textContent = `${newPowerOutput} MW`;
    waterFlowElement.textContent = `${newWaterFlow} m³/s`;
}

// Function to check for anomalies
function checkAnomalies() {
    const alertBox = document.getElementById('alert');
    const integrityStatusElement = document.getElementById('integrity-status');

    // Simulate anomaly detection
    const hasAnomaly = Math.random() > 0.7; // 30% chance of an anomaly

    if (hasAnomaly) {
        alertBox.style.display = 'block'; // Show the alert box
        integrityStatusElement.textContent = 'Anomaly Detected';
        integrityStatusElement.style.color = 'red';
    } else {
        alertBox.style.display = 'none'; // Hide the alert box
        integrityStatusElement.textContent = 'Normal';
        integrityStatusElement.style.color = '#00FF7F'; // Neon green for normal
    }
}

// Call updateDashboard every 5 sec
setInterval(updateDashboard, 5000);