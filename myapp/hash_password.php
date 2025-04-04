<?php
$password = "admin"; // Change this if needed
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
echo "INSERT INTO users (username, password) VALUES ('admin', '$hashedPassword');";
?>
