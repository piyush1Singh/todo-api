<?php
include "database.php";
header('Access-Control-Allow-Origin: *'); // replace with your React app's domain
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');
$json = file_get_contents('php://input');
$json = json_decode($json);
// print_r($json->id);die();

// $res=$_POST;
// $res=json_encode($res);
// $res=json_decode($res);
// print_r($res);die();
if (isset($json->id)) {
    $id = $json->id;

    $query  = "Update todolist set status = '0' Where id = $id ";
// echo $query;die();
    $result = mysqli_query($conn, $query);

    if (mysqli_query($conn, $query)) {
        $result= ["status"=>"success"];
        $row = json_encode($result);
        // echo "<pre>";
        print_r($row);
    } else {
    $result= ["status"=>"No Data Found"];
    $row = json_encode($result);
    print_r($row);
        // echo "<h1>No Data Found</h1>";
    }
} else {
    $result= ["status"=>"No Id Found"];
    $row = json_encode($result);
    print_r($row);
    // echo "No Id Found";
}
