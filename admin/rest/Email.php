<?php

class Email extends Connection
{
  
  private $_select = "SELECT * FROM config WHERE id=1";
  private $_update = "UPDATE config SET host = :host, port = :port, encryption= :encryption, username = :username, password = :password WHERE id = 1";

  public function sendEmail(){
  error_reporting(0);
     
      require "../libs/vendor/swiftmailer/swiftmailer/lib/swift_required.php";
      try {
        $db = parent::connection();
        $stmt = $db->prepare($this->_select);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_OBJ);
        
        $transport = Swift_SmtpTransport::newInstance()

        ->setHost($result->host)
        ->setPort($result->port)
        ->setEncryption($result->encryption)
        ->setUsername($result->username)
        ->setPassword($result->password);

        $mailer = Swift_Mailer::newInstance($transport);

          $message = Swift_Message::newInstance()

          ->setSubject($_POST['subject'])

          ->setFrom(array($result->username => $result->username))

          ->setTo(array($_POST['email'] => $_POST['email']))

          ->setBody($_POST['message'], 'text/html');

              if ($mailer->send($message)){
                  echo "<script>alert('Email sent'); window.history.back()</script>";
              }
              else{
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
                  
                  if(mail($setTo, $subject, utf8_decode($message), $header)){
                  echo "<script>alert('Email sent'); window.history.back()</script>";  
                } 
                else{
                  echo "<script>alert('Error! Try Again'); window.history.back()</script>";
                }
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
