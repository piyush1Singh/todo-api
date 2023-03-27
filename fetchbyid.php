<?php
include "database.php";
header('Access-Control-Allow-Origin: *'); // replace with your React app's domain
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');
$json = file_get_contents('php://input');
$json = json_decode($json);
if (isset($json->id)) {
    $id = $json->id;

    $query  = "SELECT * FROM todolist Where id = $id";
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_all($result);
        $row = json_encode($row);
        // echo "<pre>";
        print_r($row);
    } else {
        $result= ["status"=>"No Id Found"];
        $row = json_encode($result);
        print_r($row);
    }
}else {
    $result= ["status"=>"No Id Found"];
    $row = json_encode($result);
    print_r($row);
    // echo "No Id Found";
}
?>
