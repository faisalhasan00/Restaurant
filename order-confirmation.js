document.addEventListener('DOMContentLoaded', () => {
    // Retrieve the saved delivery time from local storage
    const deliveryTime = localStorage.getItem('deliveryTime');
    
    if (deliveryTime) {
        // Calculate the remaining time
        const deliveryDate = new Date(deliveryTime);
        const updateTimer = () => {
            const now = new Date();
            const remainingTime = deliveryDate - now;
            
            if (remainingTime <= 0) {
                document.getElementById('timer').textContent = '00:00:00';
                clearInterval(timerInterval);
                return;
            }
            
            const hours = Math.floor(remainingTime / (1000 * 60 * 60));
            const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
            
            document.getElementById('timer').textContent = 
                `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        };

        // Update timer every second
        const timerInterval = setInterval(updateTimer, 1000);

        // Display initial timer
        updateTimer();
    } else {
        document.getElementById('timer').textContent = 'No delivery time set';
    }
});
