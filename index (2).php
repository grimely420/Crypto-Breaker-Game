<?php
session_start();
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
  
    <style>
        body {
            background-image: url('assets/login_background.png');
            background-size: cover;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .container {
            background: rgba(255, 255, 255, 0.8);
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            text-align: center;
            width: 300px;
        }
        .form-group {
            margin-bottom: 15px;
        }
        .form-group label {
            display: block;
            margin-bottom: 5px;
        }
        .form-group input {
            width: 100%;
            padding: 8px;
            box-sizing: border-box;
        }
        .btn {
            background-color: #007BFF;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            width: 100%;
        }
        .btn:hover {
            background-color: #0056b3;
        }
        .error-message {
            color: red;
            margin-bottom: 15px;
        }
        p {
            margin-top: 10px;
        }
        p a {
            color: #007BFF;
            text-decoration: none;
        }
        p a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Login</h2>
        <?php if (isset($_SESSION['error_message'])): ?>
            <div class="error-message">
                <?php
                echo htmlspecialchars($_SESSION['error_message'], ENT_QUOTES, 'UTF-8');
                unset($_SESSION['error_message']);
                ?>
            </div>
        <?php endif; ?>
        <form action="loginform.php" method="POST">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" placeholder="Username" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Password" required>
            </div>
            <button type="submit" class="btn">Login</button>
        </form>
        <p>Don't have an account? <a href="registration.php">Register here</a></p>
    </div>
</body>
</html>

