const airplane = document.getElementById('airplane');
const obstacle = document.getElementById('obstacle');
const gameArea = document.getElementById('game');
let score = 0;
let isGameOver = false;
let obstacleSpeed = 5; // Speed of the obstacle

// Move airplane based on key press
document.addEventListener('keydown', (event) => {
    if (isGameOver) return;

    const airplaneStyle = window.getComputedStyle(airplane);
    const airplaneTop = parseInt(airplaneStyle.top);
    const airplaneLeft = parseInt(airplaneStyle.left);

    switch (event.key) {
        case 'ArrowUp':
            if (airplaneTop > 0) {
                airplane.style.top = (airplaneTop - 10) + 'px';
            }
            break;
        case 'ArrowDown':
            if (airplaneTop < gameArea.clientHeight - airplane.clientHeight) {
                airplane.style.top = (airplaneTop + 10) + 'px';
            }
            break;
        case 'ArrowLeft':
            if (airplaneLeft > 0) {
                airplane.style.left = (airplaneLeft - 10) + 'px';
            }
            break;
        case 'ArrowRight':
            if (airplaneLeft < gameArea.clientWidth - airplane.clientWidth) {
                airplane.style.left = (airplaneLeft + 10) + 'px';
            }
            break;
    }
});

// Function to generate a new obstacle
function generateObstacle() {
    const obstacleY = Math.random() * (gameArea.clientHeight - 50);
    obstacle.style.top = `${obstacleY}px`;
    obstacle.style.left = `100vw`; // Start off screen on the right
}

// Move the obstacle
function moveObstacle() {
    const obstacleInterval = setInterval(() => {
        if (isGameOver) {
            clearInterval(obstacleInterval);
            return;
        }

        const obstacleLeft = parseInt(window.getComputedStyle(obstacle).left);
        obstacle.style.left = (obstacleLeft - obstacleSpeed) + 'px';

        // Reset position if it goes off screen
        if (obstacleLeft < -50) {
            score++; 
            obstacleSpeed += 0.5; // Increase speed as score increases
            generateObstacle(); // Generate new obstacle
            resetObstaclePosition(); // Move the obstacle back to the right
        }

        // Check for collision
        if (isCollision(airplane, obstacle)) {
            clearInterval(obstacleInterval);
            alert(`Game Over! Your score: ${score}`);
            isGameOver = true;
        }
    }, 100);
}

// Reset the position of the obstacle
function resetObstaclePosition() {
    obstacle.style.left = '100vw'; // Move off screen to reset
    generateObstacle(); // Generate new obstacle randomly
}

// Collision detection
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
generateObstacle(); // Generate the first obstacle
moveObstacle(); // Start moving the obstacle
