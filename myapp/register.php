<?php
include 'db.php';

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    $username = $conn->real_escape_string($input['username']);
    $password = $input['password'];
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);  // Hash the password

    // Check if username already exists
    $checkUserQuery = "SELECT * FROM users WHERE username = '$username'";
    $result = $conn->query($checkUserQuery);

    if ($result->num_rows > 0) {
        echo json_encode(["error" => "Username already exists."]);
    } else {
        // Insert the user into the database
        $sql = "INSERT INTO users (username, password) VALUES ('$username', '$hashed_password')";
        
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["message" => "User registered successfully!"]);
        } else {
            echo json_encode(["error" => "Error: " . $conn->error]);
        }
    }

    $conn->close();
} else {
    echo json_encode(["error" => "Invalid request method."]);
}
?>
