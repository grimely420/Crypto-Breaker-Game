<?php
include "db_config.php";
session_start();

// Utility functions
function logLoginAttempt($message) {
    $logFile = 'log.txt';
    $timestamp = date('Y-m-d H:i:s');
    $logMessage = "[$timestamp] $message" . PHP_EOL;
    file_put_contents($logFile, $logMessage, FILE_APPEND);
}

function redirectWithError($message) {
    $_SESSION['error_message'] = $message;
    header("Location: error.php"); // Redirect to an error handling page
    exit();
}

// Rate-limiting: Limit login attempts
if (!isset($_SESSION['login_attempts'])) {
    $_SESSION['login_attempts'] = 0;
}
if ($_SESSION['login_attempts'] >= 3) {
    redirectWithError("Too many login attempts. Please try again later.");
}

// Check if the request is POST (for login)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username_input = trim(htmlspecialchars($_POST['username'] ?? ''));
    $password_input = trim($_POST['password'] ?? '');

    if (empty($username_input) || empty($password_input)) {
        redirectWithError("Username and password are required.");
    }

    try {
        // Query to verify credentials
        $stmt = $conn->prepare("SELECT user_id, username, password FROM login_info WHERE username = ?");
        $stmt->bind_param("s", $username_input);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();

            // Verify the password
            if (password_verify($password_input, $user['password'])) {
                // Regenerate session ID for security
                session_regenerate_id(true);

                // Set session variables
                $_SESSION['user_id'] = $user['user_id'];
                $_SESSION['username'] = $user['username'];
                unset($_SESSION['login_attempts']); // Reset login attempts

                logLoginAttempt("Login successful for user: $username_input");
                header("Location: game.php"); // Redirect to the game page
                exit();
            } else {
                $_SESSION['login_attempts']++;
                logLoginAttempt("Invalid password attempt for user: $username_input");
                redirectWithError("Invalid password.");
            }
        } else {
            $_SESSION['login_attempts']++;
            logLoginAttempt("Invalid username attempt: $username_input");
            redirectWithError("Invalid username.");
        }
    } catch (Exception $e) {
        logLoginAttempt("Error during login for user: $username_input - " . $e->getMessage());
        redirectWithError("An error occurred during login.");
    } finally {
        if (isset($stmt)) {
            $stmt->close();
        }
    }
}

// If accessed without proper method
http_response_code(400);
echo json_encode(['error' => 'Invalid request method or missing user ID.']);
?>
