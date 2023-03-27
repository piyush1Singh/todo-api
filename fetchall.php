<?php 
include "database.php";
header('Access-Control-Allow-Origin: *'); // replace with your React app's domain
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');
$query  = "SELECT * FROM `todolist` where status = 1 ORDER BY ID DESC";
$result = mysqli_query($conn,$query);

if(mysqli_num_rows($result)>0){
    $row = mysqli_fetch_all($result);
    $row = json_encode($row);
    // return $row;
    // echo "<pre>";
    print_r($row);
}else{
    echo "<h1>No Data Found</h1>";
}
