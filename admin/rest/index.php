<?php
ob_start();
session_start();
header('Content-Type: application/json');

require 'Slim/Slim.php';
require 'Connection.php';
require 'Brand.php';
require 'User.php';
require 'Company.php';
require 'Email.php';

$app = new Slim();
$brand = new Brand();
$user = new User();
$company = new Company();
$email = new Email();

// Allow from any origin
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Max-Age: 86400');    // cache for 1 day
    }
    // Access-Control headers are received during OPTIONS requests
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
            header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");         

        if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
            header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    }


$app->post('/login', function() use($user, $app) {
    $user->login();
});
$app->get('/login', function() use($user, $app) {
    $user->checkLogin();
});

$app->get('/logout', function() use($user, $app) {
    $user->logout();
});

$app->post('/brands', function() use($brand, $app) {

  
  if (isset($_SESSION['app']) && isset($_COOKIE['app'])) {
    $brand->newBrand();
  } else {
    echo "<script>window.location='../../'</script>";
  }
});

$app->post('/brands/updateImage', function() use($brand, $app) {
  if (isset($_SESSION['app']) && isset($_COOKIE['app'])) {
    $brand->updateImage();
  } else {
    echo "<script>window.location='../../'</script>";
  }
});

// GET
$app->get('/brands', function() use($brand) {
    $brand->getBrands();
});

$app->get('/brands/:id', function($id) use($brand) {
  $brand->getBrand($id);
});

$app->delete('/brands/:id', function($id) use($brand) {
  if (isset($_SESSION['app']) && isset($_COOKIE['app'])) {
    $brand->delete($id);
  } else {
    echo "<script>window.location='../../'</script>";
  }
});

// $app->post('/brands', function() use($brand, $app) {
//   $request = $app->request();
//   $body = $request->getBody();
//   $data = json_decode($body);
//   $brand->insert($data);
// });

$app->put('/brands/:id', function($id) use($brand, $app) {

  
  if (isset($_SESSION['app']) && isset($_COOKIE['app'])) {
    $request = $app->request();
    $body = $request->getBody();
    $data = json_decode($body);
    $data->id = $id;
    $brand->update($data);
  } else {
    echo "<script>window.location='../../'</script>";
  }
});


$app->get('/users/:id', function($id) use($user) {
  if (isset($_SESSION['app']) && isset($_COOKIE['app'])) {
    $user->getUser($id);
  } else {
    echo "<script>window.location='../../'</script>";
  }
});


$app->put('/users/:id', function($id) use($user, $app) {
  
  if (isset($_SESSION['app']) && isset($_COOKIE['app'])) {
    $request = $app->request();
    $body = $request->getBody();
    $data = json_decode($body);
    $data->id = $id;
    $user->update($data);
  } else {
    echo "<script>window.location='../../'</script>";
  }
});



$app->get('/company', function() use($company){


      $company->get();
  

});

$app->put('/company/:id', function() use($company, $app){


      if (isset($_SESSION['app']) && isset($_COOKIE['app'])) {
    $request = $app->request();
    $body = $request->getBody();
    $data = json_decode($body);
    $data->id = $id;
    $company->update($data);
  } else {
    echo "<script>window.location='../../'</script>";
  }
  

});

$app->post('/email', function() use($email) {
   
     $email->sendEmail();
  
});
$app->get('/email', function() use($email) {
   
    if (isset($_SESSION['app']) && isset($_COOKIE['app'])) {
     $email->get();
    } else {
      echo "<script>window.location='../../'</script>";
    }
  
});
$app->post('/email/config', function() use($email) {
   
    if (isset($_SESSION['app']) && isset($_COOKIE['app'])) {
     $email->update();
    } else {
      echo "<script>window.location='../../'</script>";
    }
  
});



$app->run();

?>