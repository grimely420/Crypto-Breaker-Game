<?php
// db_config.php
// Database configuration
$host = 'localhost';  
$db = 'markxwyo_player_stats';  
$username = 'markxwyo_laserteam'; 
$password = 'Homiez@420';  
$charset = 'utf8mb4';
$conn = new mysqli($host, $username, $password, $db);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}