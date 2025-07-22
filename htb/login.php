<!-- login.php -->
<?php
session_start();
$mysqli = new mysqli("localhost", "webapp", "webpass", "firewalldb");

if ($mysqli->connect_error) {
    die("Database connection failed: " . $mysqli->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = $_POST['user'] ?? '';
    $pass = $_POST['pass'] ?? '';

    $stmt = $mysqli->prepare("SELECT password FROM users WHERE username = ?");
    $stmt->bind_param("s", $user);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($hashed);
        $stmt->fetch();

        if (password_verify($pass, $hashed)) {
            $_SESSION['auth'] = true;
            header('Location: dashboard.php');
            exit;
        }
    }
    $error = "Invalid credentials";
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Firewall Admin Login</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f2f5;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }
        h2 {
            color: #333;
        }
        form {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        input {
            margin: 10px 0;
            padding: 10px;
            width: 100%;
        }
        button {
            padding: 10px;
            width: 100%;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #0056b3;
        }
        p {
            color: red;
        }
    </style>
</head>
<body>
    <h2>Login to Firewall Manager</h2>
    <?php if (!empty($error)) echo "<p style='color:red;'>$error</p>"; ?>
    <form method="POST">
        <input type="text" name="user" placeholder="Username" required><br>
        <input type="password" name="pass" placeholder="Password" required><br>
        <button type="submit">Login</button>
    </form>
</body>
</html>