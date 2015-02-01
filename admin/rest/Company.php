<?php

class Company extends Connection
{


  private $_select = "SELECT * FROM company";
  private $_update = "UPDATE company SET name = :name, info = :info WHERE id = :id";

  public function update($data) 
  {
    try {
      $db = parent::connection();
      $stmt = $db->prepare($this->_update);  
      $stmt->bindParam("name", $data->name);
      $stmt->bindParam("id", $data->id);
      $data->info = (array) $data->info;
      $stmt->bindParam("info", json_encode($data->info));
      $stmt->execute();
      $db = null;
      echo json_encode($data); 
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    } 
  }


    public function get() {
    $sql = $this->_select . " LIMIT 1";
    try {
      $db = parent::connection();
      $stmt = $db->prepare($sql);        
      $stmt->execute();
      $result = $stmt->fetchObject();  
      $db = null;
      $result->info =  preg_replace("'\r?\n'",'',$result->info);
      $result->info =  stripslashes($result->info);
      $result->info =  stripcslashes($result->info);
      echo json_encode($result); 
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
  }


}