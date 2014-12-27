<?php
session_start();

require 'Slim/Slim.php';
require 'Connection.php';
require 'Brand.php';
require 'User.php';
require 'Company.php';

$app = new Slim();
$brand = new Brand();
$user = new User();
$company = new Company();

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



$app->get('/company/info', function() use($company){

  if (isset($_SESSION['app']) && isset($_COOKIE['app'])) {

      echo 'hey ya company';
  
   }

});



$app->run();

?>