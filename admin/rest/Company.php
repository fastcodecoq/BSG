<?php

class Company extends Connection
{


  private $_select = "SELECT * FROM company";
  private $_update = "UPDATE company SET name = :name, address = :address, suite = :suite, state = :state, zipCode = :zipCode, tel = :tel, fax = :fax, email = :email WHERE id = :id";

  public function update($data) 
  {
    try {
      $db = parent::connection();
      $stmt = $db->prepare($this->_update);  
      $stmt->bindParam("name", $data->name);
      $stmt->bindParam("id", $data->id);
      $stmt->execute();
      $db = null;
      echo json_encode($data); 
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    } 
  }


    public function getBrand($id) {
    $sql = $this->_select . " WHERE id = :id ORDER BY name LIMIT 1";
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