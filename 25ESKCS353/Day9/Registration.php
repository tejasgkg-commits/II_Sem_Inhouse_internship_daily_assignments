<?php

include('db_connect.php');


$name = mysqli_real_escape_string($conn, $_POST['name']);
$email = mysqli_real_escape_string($conn, $_POST['email']);
$phone = mysqli_real_escape_string($conn, $_POST['phone']);
$dob = mysqli_real_escape_string($conn, $_POST['dob']);
$branch = mysqli_real_escape_string($conn, $_POST['branch']);
$roll_number = mysqli_real_escape_string($conn, $_POST['roll_number']);
$cgpa = mysqli_real_escape_string($conn, $_POST['cgpa']);



$errors = [];
$success = "";
 
  echo "<br> " .  "<br>";
  // Name: required only
  if ($name === '') {
    $errors['name'] = 'Name is required.';
    echo "Name is required.";
  }

  // Email: required only
  if ($email === '') {
    $errors['email'] = 'Email is required.';
    echo "Email is required.";
  }

  if (empty($errors)) {
    $success = 'Form submitted successfully.';

     $sql = "INSERT INTO user (full_name, dob ,email,roll_number, branch, cgpa, phone_number) VALUES ('$name','$dob', '$email','$roll_number','$branch', '$cgpa', '$phone')";

      if (mysqli_query($conn, $sql)) {
        echo "New record created successfully";
         } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
  }
    
    
  }
 

?>
