<?php

class Brand extends Connection
{
  
  private $_select = "SELECT * FROM brands ";
  private $_update = "UPDATE brands SET name = :name, order = :order WHERE id = :id";
  private $_insert = "INSERT INTO brands(name, image, order) VALUES(:name, :image, :order)";
  private $_updateImg = "UPDATE brands SET image = :image  WHERE id = :id";
  private $_delete = "DELETE FROM brands WHERE id = :id";

  public function newBrand(){
      $name=$_POST["name"];
      $temp_name=$_FILES["img"]["tmp_name"];
      $type=$_FILES["img"]["type"];
      $order = $_POST["order"];
      
      switch ($type) {
        case 'image/png':
          $extension = ".png";
          break;
        case 'image/gif':
          $extension = ".gif";
          break;
        case 'image/jpeg':
          $extension = ".jpg";
          break;
        case 'image/bmp':
          $extension = ".bmp";
          break;
        case 'image/x-icon':
          $extension = ".ico";
          break;
      }


    if($type == 'image/png' ||  $type == 'image/gif' || $type == 'image/jpeg' || $type == 'image/bmp' || $type == 'image/x-icon'){
        $namea = str_replace(" ","_", $name);
        $fullname=$namea.$extension;
        copy($temp_name, "../../img/uploads/$fullname");
        $db = parent::connection();
        $stmt = $db->prepare($this->_insert);  
        $stmt->bindParam("name", $name);
        $stmt->bindParam("image", $fullname);
        $stmt->bindParam("order", $order,  PDO::PARAM_INT);
        $stmt->execute();
        $db = null; 
        echo "<script>window.location = '../#brands'</script>";
    }  
  }
  
  public function insert($data){ 
    try {
      $db = parent::connection();
      $stmt = $db->prepare($this->_insert);  
      $stmt->bindParam("name", $data->name);
      $stmt->bindParam("image", $data->image);
      $stmt->bindParam("order", $data->order);
      $stmt->execute();
      $data->id = $db->lastInsertId();
      $db = null;
      echo json_encode($data); 
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
  }

  public function delete($id){
    try {
      $db = parent::connection();
      $stmt = $db->prepare($this->_delete);  
      $stmt->bindParam("id", $id);
      $stmt->execute();
      $db = null;
      echo 'ok';
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    }
  }

  public function update($data) 
  {
    try {
      $db = parent::connection();
      $stmt = $db->prepare($this->_update);  
      $stmt->bindParam("name", $data->name);
      $stmt->bindParam("id", $data->id);
      $stmt->bindParam("order", $data->order);
      $stmt->execute();
      $db = null;
      echo json_encode($data); 
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    } 
  }
  public function updateImage() 
  {
    try {
      $temp_name=$_FILES["img"]["tmp_name"];
      $type=$_FILES["img"]["type"];
      $id=$_POST['id'];
      
      switch ($type) {
        case 'image/png':
          $extension = ".png";
          break;
        case 'image/gif':
          $extension = ".gif";
          break;
        case 'image/jpeg':
          $extension = ".jpg";
          break;
        case 'image/bmp':
          $extension = ".bmp";
          break;
        case 'image/x-icon':
          $extension = ".ico";
          break;
      }


      if($type == 'image/png' ||  $type == 'image/gif' || $type == 'image/jpeg' || $type == 'image/bmp' || $type == 'image/x-icon'){
          $namea = str_replace(" ","_", $_POST['name']);
          $fullname=$namea.$extension;
          copy($temp_name, "../../img/uploads/$fullname");
          $db = parent::connection();
          $stmt = $db->prepare($this->_updateImg);
          $stmt->bindParam("image", $fullname);
          $stmt->bindParam("id", $id);
          $stmt->execute();
          $db = null; 
          echo "<script>window.location = '../../#brands'</script>";
      }
    } catch(PDOException $e) {
      echo '{"error":{"text":'. $e->getMessage() .'}}'; 
    } 
  }

  public function getBrands() {
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

  public function getBrand($id) {
    $sql = $this->_select . " WHERE id = :id ORDER BY name";
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
