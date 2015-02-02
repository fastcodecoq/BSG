<?php

class Email extends Connection
{
  
  private $_select = "SELECT * FROM config WHERE id=1";
  private $_update = "UPDATE config SET host = :host, port = :port, encryption= :encryption, username = :username, password = :password WHERE id = 1";

  public function sendEmail(){
     
  require_once('../libs/phpmailer/class.phpmailer.php');
      $db = parent::connection();
        $stmt = $db->prepare($this->_select);
        $stmt->execute();
        $mail = new PHPMailer(true);
        $mail->IsSMTP();
      try {
        

        $result = $stmt->fetch(PDO::FETCH_OBJ);
          $mail->Host       = $result->host; 
          $mail->SMTPDebug  = 2;                     
          $mail->SMTPAuth   = true;                
          $mail->SMTPSecure = "ssl";                
          $mail->Host       = $result->host;    
          $mail->Port       = $result->port;                   
          $mail->Username   = $result->username; 
          $mail->Password   = $result->password;
          $mail->AddReplyTo($result->username);
          $mail->AddAddress($_POST['email']);
          $mail->SetFrom($result->username);
          $mail->Subject = $_POST['subject'];
          $mail->Body = 'Name: '.$_POST['name'];
          $mail->AltBody = $_POST['message'];
          
          if (!$mail->Send()){
              $email = $_POST['email'];   
              $name = $_POST['name'];    
              $header = 'From: ' . $email . " r/n/";   
              $header .= "X-Mailer: PHP/" . phpversion() . " r/n/";    
              $header .= "Mime-Version: 1.0 r/n/";   
              $header .= "Content-Type: text/plain";   
              $message = "Send by: " . $name . " r/n/";    
              $message .= "Email: " .$email. " r/n/";    
              $message .= "Message: " .$_POST['mensaje-mail']. " r/n/";    
              $message .= "Date: " . date('d/m/Y', time());    
              $setTo = $result->username;    
              $subject = "".$_POST['subject']."";    
                     
              if(mail($setTo, $subject, utf8_decode($message), $header))
                  echo "<script>alert('Email sent'); window.history.back()</script>";
                else
                  echo "<script>alert('ERROR!! Try Again!'); window.history.back()</script>";  
            }
            else{
                echo "<script>alert('Email sent'); window.history.back()</script>";    
              }   

      } catch(PDOException $e) {
        echo '{"error":{"text":'. $e->getMessage() .'}}'; 
      }


  }
  public function configEmail(){
    
  }
  public function update() 
  {

    try {
      $db = parent::connection();
      $stmt = $db->prepare($this->_update);  
      $stmt->bindParam("host", $_POST['host']);
      $stmt->bindParam("port", $_POST['port']);
      $stmt->bindParam("encryption", $_POST['encryption']);
      $stmt->bindParam("username", $_POST['username']);
      $stmt->bindParam("password", $_POST['password']);
      $stmt->execute();
      $db = null;
      echo "<script>alert('Success');window.location='../../#/email-cfg'</script>";
    } catch(PDOException $e) {
      echo "<script>alert('Error! Try Again');window.location='../../#/email-cfg'</script>";
    } 
  }
 public function get() {
    $sql = $this->_select;
    try {
      $db = parent::connection();
      $stmt = $db->query($sql);  
      $result = $stmt->fetchAll(PDO::FETCH_OBJ);
      $db = null;
      echo json_encode($result);
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
  }
  

}
