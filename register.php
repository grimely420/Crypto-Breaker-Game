<?php
include "db_config.php";
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

$logFile = 'error_log.txt';
function logMessage($message) {
    global $logFile;
    file_put_contents($logFile, date('Y-m-d H:i:s') . " - " . $message . "\n", FILE_APPEND);
}

function calculateAge($dob) {
    $dob = new DateTime($dob);
    $now = new DateTime();
    $age = $now->diff($dob)->y;
    return $age;
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = trim($_POST['username']);
    $first_name = trim($_POST['first_name']);
    $last_name = trim($_POST['last_name']);
    $email = trim($_POST['email']);
    $dob = trim($_POST['dob']);
    $password = password_hash(trim($_POST['password']), PASSWORD_BCRYPT);

    // Check if user is at least 13 years old
    if (calculateAge($dob) < 13) {
        logMessage("User under 13 years old attempted registration: $dob");
        $_SESSION['error_message'] = 'You must be at least 13 years old to register.';
        header("Location: registration.php");
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        logMessage("Invalid email: $email");
        $_SESSION['error_message'] = 'Invalid email format';
        header("Location: registration.php");
        exit;
    }

    try {
        $conn->begin_transaction();

        // Check username uniqueness
        $stmt = $conn->prepare("SELECT COUNT(*) FROM login_info WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $stmt->bind_result($count);
        $stmt->fetch();
        $stmt->close();
        if ($count > 0) {
            logMessage("Username already exists: $username");
            $_SESSION['error_message'] = 'Username already exists';
            header("Location: registration.php");
            exit;
        }

        // Check email uniqueness
        $stmt = $conn->prepare("SELECT COUNT(*) FROM login_info WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->bind_result($count);
        $stmt->fetch();
        $stmt->close();
        if ($count > 0) {
            logMessage("Email already exists: $email");
            $_SESSION['error_message'] = 'Email already exists';
            header("Location: registration.php");
            exit;
        }

        // Insert user into login_info
        $stmt = $conn->prepare("INSERT INTO login_info (username, first_name, last_name, email, dob, password) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssss", $username, $first_name, $last_name, $email, $dob, $password);
        if (!$stmt->execute()) {
            throw new Exception("Failed to insert into login_info: " . $stmt->error);
        }
        $user_id = $stmt->insert_id;
        $stmt->close();

        // Insert user_id into user_stats
        $stmt = $conn->prepare("INSERT INTO user_stats (user_id, high_score, total_tokens, total_rounds_played, total_rounds_won, total_rounds_lost) VALUES (?, 0, 0, 0, 0, 0)");
        $stmt->bind_param("i", $user_id);
        if (!$stmt->execute()) {
            throw new Exception("Failed to insert into user_stats: " . $stmt->error);
        }
        $stmt->close();

        $conn->commit();
        logMessage("User registered successfully: $user_id");

        $_SESSION['success_message'] = 'Registration successful';
        header("Location: index.php");
        exit;

    } catch (Exception $e) {
        $conn->rollback();
        logMessage("Error: " . $e->getMessage());
        $_SESSION['error_message'] = 'Registration failed';
        header("Location: registration.php");
        exit;
    }
}
?>
