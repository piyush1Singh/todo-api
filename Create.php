<?php
include "database.php";
header('Access-Control-Allow-Origin: *'); // replace with your React app's domain
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');
$json = file_get_contents('php://input');
$json = json_decode($json);
if (isset($json->tododesc)) {
    $tododesc = $json->tododesc;
    $date= date("y-m-d");

    $query  = "INSERT INTO `todolist`( `tododesc`) VALUES ('$tododesc')";
// echo($query);die();
    if (mysqli_query($conn, $query)) {
        $result= ["status"=>"success"];
        $row = json_encode($result);
        // echo "<pre>";
        print_r($row);
    }else {
        $result= ["status"=>"No Id Found"];
        $row = json_encode($result);
        print_r($row);
        // echo "No Id Found";
    }
}else {
    $result= ["status"=>"No Id Found"];
    $row = json_encode($result);
    print_r($row);
    // echo "No Id Found";
}
