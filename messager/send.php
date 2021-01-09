<?php
    $content = $_POST["content"];
    $id = $_POST["id"];
    $con = mysqli_connect("localhost", "root", "", "test");
    if (!$con) {
        die("connection error");
    }
    $result = mysqli_query($con, "SELECT * FROM loginpass WHERE id=".$id);
    for ($data = []; $row = mysqli_fetch_assoc($result); $data[] = $row);
    mysqli_query($con, 'INSERT INTO messages(author, content) VALUES ("'.$data[0]["nickname"].'", "'.$content.'")');
    header('Location: main.php')
?>