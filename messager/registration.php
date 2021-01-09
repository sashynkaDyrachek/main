<?php
$login = $_POST["login"];
$password = $_POST["password"];
if ($login == null || $password == null) {
    die("log pass problem");
}
$con = mysqli_connect("sql2.freemysqlhosting.net", "sql2385960", "fM5*tP1%", "sql2385960");
if (!$con) {
    die("connection error");
}
$result = mysqli_query($con, "SELECT * FROM loginpass");
for ($data = []; $row = mysqli_fetch_assoc($result); $data[] = $row);
$query = 'INSERT INTO loginpass (id, nickname, password) VALUES ('.count($data).', "'.$login.'", "'.$password.'")';
mysqli_query($con, $query);
header('Location: login.html')
?>
