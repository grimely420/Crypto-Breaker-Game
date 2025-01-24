<?php
session_start();
include "db_config.php";

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    http_response_code(401); // Unauthorized
    echo json_encode(['error' => 'User not logged in']);
    exit;
}

$user_id = $_SESSION['user_id'];

// Validate JSON input
$data = json_decode(file_get_contents('php://input'), true);
if (!$data) {
    http_response_code(400); // Bad Request
    echo json_encode(['error' => 'Invalid JSON payload']);
    exit;
}

// Extract and validate data
$score = $data['score'] ?? 0;
$roundsWon = $data['roundsWon'] ?? 0;
$roundsPlayed = $data['roundsPlayed'] ?? 0;
$roundsLost = $data['roundsLost'] ?? 0;
$tokens = $data['tokenC'] ?? 0;
$levelsReached = $data['levelsReached'] ?? 0;
$gameOvers = $data['gameOvers'] ?? 0;

// Validate rounds data
if ($roundsPlayed !== $roundsWon + $roundsLost) {
    http_response_code(400);
    echo json_encode(['error' => 'Rounds played does not match rounds won and lost']);
    exit;
}

// Database connection
$conn = new mysqli($host, $username, $password, $db);
if ($conn->connect_error) {
    http_response_code(500); // Internal Server Error
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

// Retrieve existing stats
$sql = "SELECT high_score, total_tokens, total_rounds_played, total_rounds_won, total_rounds_lost, levels_reached, game_overs 
        FROM user_stats 
        WHERE user_id = ?";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    http_response_code(500);
    echo json_encode(['error' => $conn->error]);
    exit;
}

$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Existing record: Update stats
    $row = $result->fetch_assoc();
    $high_score = $row['high_score'] + $score;
    $total_rounds_played = $row['total_rounds_played'] + $roundsPlayed;
    $total_rounds_won = $row['total_rounds_won'] + $roundsWon;
    $total_rounds_lost = $row['total_rounds_lost'] + $roundsLost;
    $total_tokens = $row['total_tokens'] + $tokens;
    $levels_reached = $row['levels_reached'] + $levelsReached;
    $game_overs = $row['game_overs'] + $gameOvers;

    $update_sql = "UPDATE user_stats 
                   SET high_score = ?, 
                       total_tokens = ?, 
                       total_rounds_played = ?, 
                       total_rounds_won = ?, 
                       total_rounds_lost = ?, 
                       levels_reached = ?, 
                       game_overs = ? 
                   WHERE user_id = ?";
    $update_stmt = $conn->prepare($update_sql);
    if (!$update_stmt) {
        http_response_code(500);
        echo json_encode(['error' => $conn->error]);
        exit;
    }

    $update_stmt->bind_param("iiiiiiii", $high_score, $total_tokens, $total_rounds_played, $total_rounds_won, $total_rounds_lost, $levels_reached, $game_overs, $user_id);
    $update_stmt->execute();
    $update_stmt->close();
} else {
    // No record: Insert new stats
    $insert_sql = "INSERT INTO user_stats (user_id, high_score, total_rounds_played, total_rounds_lost, total_rounds_won, total_tokens, levels_reached, game_overs) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $insert_stmt = $conn->prepare($insert_sql);
    if (!$insert_stmt) {
        http_response_code(500);
        echo json_encode(['error' => $conn->error]);
        exit;
    }

    $insert_stmt->bind_param("iiiiiiii", $user_id, $score, $roundsPlayed, $roundsLost, $roundsWon, $tokens, $levelsReached, $gameOvers);
    $insert_stmt->execute();
    $insert_stmt->close();
}


$stmt->close();
$conn->close();

echo json_encode(['status' => 'success']);
?>
