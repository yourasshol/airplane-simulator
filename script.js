const airplane = document.getElementById('airplane');
const obstacle = document.getElementById('obstacle');
const gameArea = document.getElementById('game');
let score = 0;
let isGameOver = false;

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

// Obstacle behavior
function startObstacle() {
    obstacle.style.left = '100vw'; // start off screen
    const randomY = Math.floor(Math.random() * (gameArea.clientHeight - 50));
    obstacle.style.top = randomY + 'px';
    let obstacleSpeed = 5; // pixels per frame

    const obstacleInterval = setInterval(() => {
        if (isGameOver) {
            clearInterval(obstacleInterval);
            return;
        }
        
        // Move obstacle
        const obstacleLeft = parseInt(obstacle.style.left);
        obstacle.style.left = (obstacleLeft - obstacleSpeed) + 'px';

        // Reset position if it goes off screen
        if (obstacleLeft < -50) {
            score++; // Increment score
            obstacleSpeed += 0.5; // Increase speed as score increases
            startObstacle(); // Start a new obstacle
        }

        // Check for collision
        if (isCollision(airplane, obstacle)) {
            clearInterval(obstacleInterval);
            alert(`Game Over! Your score: ${score}`);
            isGameOver = true;
        }
    }, 100);
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

// Start the obstacle movement
startObstacle();
