<?php

class User extends Connection
{
  
  private $_select = "SELECT * FROM users ";
  private $_update = "UPDATE users SET username = :username, email = :email, password = :password WHERE id = :id";
  private $_login = "SELECT * FROM users WHERE email = :email AND password = :password";

  public function login(){
      $db = parent::connection();
      $stmt = $db->prepare($this->_login);
      $stmt->bindParam("email", $_POST['email']);
      $stmt->bindParam("password", $_POST['password']);
      $stmt->execute();
      $result = $stmt->fetchColumn();  
      if ($result) {
        $_SESSION['app'] = $_POST['email'];
        setcookie("app", "app");
          echo "<script>window.location = '../#brands'</script>";
      }else{
          echo "<script>window.location = '../'</script>";

      }
  }
  public function checkLogin(){
    if (isset($_SESSION['app']) && $_SESSION['app'])
      $res = array('response' =>1);
    else
      $res = array('response'=>0);
    echo json_encode($res);
  }

  public function logout(){ 
      unset($_SESSION['app']);
      unset($_COOKIE['app']);
        echo "<script>window.location = '../'</script>";
    
  }
  public function update($data) 
  {
    try {
      $db = parent::connection();
      $stmt = $db->prepare($this->_update);  
      $stmt->bindParam("username", $data->username);
      $stmt->bindParam("email", $data->email);
      $stmt->bindParam("password", $data->password);
      $stmt->bindParam("id", $data->id);
      $stmt->execute();
      $db = null;
      echo json_encode($data); 
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    } 
  }

  public function getUser($id) {
    $sql = $this->_select . " WHERE id = :id";
    try {
      $db = parent::connection();
      $stmt = $db->prepare($sql);  
      $stmt->bindParam("id", $id);
      $stmt->execute();
      $result = $stmt->fetchObject();  
      $db = null;
      echo json_encode($result); 
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
  }

}
