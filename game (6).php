<?php
session_start();
include 'db_config.php';

// Check if the session variables are set
if (!isset($_SESSION['user_id'])) {
    header("Location: index.php"); // Redirect to login page if not logged in
    exit();
}

// Access session variables
$user_id = $_SESSION['user_id'];
$username = $_SESSION['username'] ?? 'Guest';


// Initialize variables for query results
$high_score = 0;
$rounds_played = 0;
$rounds_won = 0;
$rounds_lost = 0;
$tokens = 0;

// Retrieve existing stats
try {
    $sql = "SELECT high_score, total_rounds_played, total_rounds_won, total_tokens, levels_reached, game_overs FROM user_stats WHERE user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $high_score = $row['high_score'];
        $rounds_played = $row['total_rounds_played'];
        $rounds_won = $row['total_rounds_won'];
        $tokens = $row['total_tokens'];
        $levels_reached = $row['levels_reached'];
        $gameOvers = $row['game_overs'];
        
    
    } else {
        error_log("No data found for user ID: $user_id");
    }
    $stmt->close();
} catch (Exception $e) {
    error_log("Database query failed: " . $e->getMessage());
}

$conn->close();
?>


<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Play 'Token Crypto Breaker,' the thrilling outer space laser game where you destroy Tokens and earn cryptocurrency! The higher your score, the more you earn.">
    <meta name="keywords" content="asteroid game, laser game, crypto rewards, outer space game, earn cryptocurrency, blockchain gaming">
    <meta name="author" content="Token Crypto Breaker">
    <meta property="og:title" content="Token Crypto Breaker - Destroy Tokens, Earn Crypto">
    <meta property="og:description" content="Embark on a cosmic adventure and earn crypto rewards while smashing Tokends!">
    <meta property="og:image" content="assets/spaceship.png">
    <meta property="og:url" content="https://lordsoflegend.xyz/">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Token Crypto Breaker - Destroy Tokens, Earn Crypto">
    <meta name="twitter:description" content="Embark on a cosmic adventure and earn crypto rewards while smashing Tokens!">
    <meta name="twitter:image" content="assets/spaceship.png">
    <title>Token Crypto Breaker - Play and Earn Cryptocurrency</title>
    <link rel="icon" href="assets/favicon.ico" type="image/png">
 <link rel="stylesheet" href="style.css">
</head>

<body>
    <div class="info-container">
        <span>Welcome, <?php echo htmlspecialchars($username); ?>!</span>
        <span>Score: <?php echo htmlspecialchars($high_score); ?></span>
        <span>Tokens: <?php echo htmlspecialchars($tokens); ?></span>
        <span>Rounds Played: <?php echo htmlspecialchars($rounds_played); ?></span>
        <span>Rounds Won: <?php echo htmlspecialchars($rounds_won); ?></span>
        <span>Game Overs: <?php echo htmlspecialchars($gameOvers); ?></span>
        <span>Levels Reached: <?php echo htmlspecialchars($levels_reached); ?></span>
    </div>

<header class="instructions">
        <h1>Asteroid Crypto Breaker</h1>
        <p>Destroy asteroids, level up, and earn cryptocurrency based on your score and class!</p>
        <div>
            <h2>How to Play</h2>
            <p>Use your laser cannon to destroy asteroids and protect your ship. Earn crypto rewards based on your high score and user class.</p>
            <ul>
                <li><strong>Controls:</strong> Arrow keys to move, spacebar to shoot, toggle the P button to Pause game. </li>
                <li><strong>Objective:</strong> Destroy all asteroids to advance levels.</li>
                <li><strong>Rewards:</strong> Earn crypto in the process </li>
            </ul>
        </div>

        
</header>
<div class="buttons-container">
    <button id="startButton">Start</button>
    <button id="logoutButton">Logout</button>
</div>

<main>
<div class="game-container">
    
        <canvas id="gameCanvas" width="800" height="600"></canvas>
</div>
<div id="controls">
    <div id="joystick"></div>
    <div id="firebutton"></div>
</div>

</main>

<footer>
    <p>&copy; 2024 Asteroid Crypto Breaker. All rights reserved.</p>
</footer>

<script src="script.js"></script>
</body>

</html>
