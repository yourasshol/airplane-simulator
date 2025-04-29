const airplane = document.getElementById('airplane');
const obstacle = document.getElementById('obstacle');
const gameArea = document.getElementById('game');
let score = 0;
let isGameOver = false;
let obstacleSpeed = 2; // Speed for the obstacle

// Move airplane based on key press
document.addEventListener('keydown', (event) => {
    if (isGameOver) return;

    const airplaneTop = parseInt(window.getComputedStyle(airplane).top);
    const airplaneLeft = parseInt(window.getComputedStyle(airplane).left);

    switch (event.key) {
        case 'ArrowUp':
            if (airplaneTop > 0) airplane.style.top = (airplaneTop - 20) + 'px';
            break;
        case 'ArrowDown':
            if (airplaneTop < gameArea.clientHeight - 50) airplane.style.top = (airplaneTop + 20) + 'px';
            break;
        case 'ArrowLeft':
            if (airplaneLeft > 0) airplane.style.left = (airplaneLeft - 20) + 'px';
            break;
        case 'ArrowRight':
            if (airplaneLeft < gameArea.clientWidth - 50) airplane.style.left = (airplaneLeft + 20) + 'px';
            break;
    }
});

// Start the obstacle movement
function startObstacle() {
    obstacle.style.left = '100%'; // Start off screen on the right
    const randomHeight = Math.random() * (gameArea.clientHeight - 50);
    obstacle.style.top = `${randomHeight}px`;

    const obstacleInterval = setInterval(() => {
        if (isGameOver) {
            clearInterval(obstacleInterval);
            return;
        }
        
        const obstacleLeft = parseInt(window.getComputedStyle(obstacle).left);
        obstacle.style.left = (obstacleLeft - obstacleSpeed) + 'px';

        // Reset position if it goes off screen
        if (obstacleLeft < -50) {
            score++; // Increment score when obstacle is passed
            obstacleSpeed += 0.5; // Increase obstacle speed
            startObstacle(); // Restart obstacle
        }

        // Check for collision
        if (isCollision(airplane, obstacle)) {
            clearInterval(obstacleInterval);
            alert(`Game Over! Your score: ${score}`);
            isGameOver = true;
        }
    }, 50); // Update obstacle position every 50 ms
}

// Collision detection function
function isCollision(airplane, obstacle) {
    const airplaneRect = airplane.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();

    return !(
        airplaneRect.top > obstacleRect.bottom ||
        airplaneRect.bottom < obstacleRect.top ||
        airplaneRect.left > obstacleRect.right ||
        airplaneRect.right < obstacleRect.left
    );
}

// Start the game
startObstacle(); // Start the obstacle after loading
