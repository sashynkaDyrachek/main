<html>
    <body>
        <div>
            <?php 
                $con = mysqli_connect("localhost", "root", "", "test");
                if (!$con) {
                    echo "connection error";
                }
                $result = mysqli_query($con, "SELECT * FROM messages");
                for ($data = []; $row = mysqli_fetch_assoc($result); $data[] = $row) {
                    echo "<p>".$row["author"]." >> ".$row["content"]."</p>";
                }
            ?>
        </div>
        <form action="send.php" method="POST">
            <input name="content">
            <input id="hiddenId" name="id" hidden>
            <button name="submit">
        </form>
        <script>
            document.getElementById("hiddenId").value = localStorage.getItem("id")
        </script>
    </body>
</html>