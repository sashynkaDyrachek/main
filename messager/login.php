<script>
localStorage.setItem("id", <?php
$login = $_POST["login"];
$password = $_POST["password"];
if ($login == null || $password == null) {
    die("log pass problem");
}
$con = mysqli_connect("localhost", "root", "", "test");
if (!$con) {
    echo "connection error";
}
$result = mysqli_query($con, 'SELECT * FROM loginpass WHERE nickname = "'.$login.'"');
for ($data = []; $row = mysqli_fetch_assoc($result); $data[] = $row);
if (count($data) < 1) {
    die("uncorrect login");
} else {
    $result = mysqli_query($con, 'SELECT * FROM loginpass WHERE nickname = "'.$login.'" AND password = "'.$password.'"');
    for ($data = []; $row = mysqli_fetch_assoc($result); $data[] = $row);
    if (count($data) < 1) {
        die ("uncorrect password");
    } else {
        $id = $data[0]["id"];
    }
}
echo $id;
?>)
location = "main.php"
</script>