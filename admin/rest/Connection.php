<?php 
	Class Connection{
		public function connection(){


            if($_SERVER['SERVER_NAME'] === 'localhost' OR $_SERVER['SERVER_NAME'] === 'gomosoft.com'){
          				    $dbhost="localhost";
          				    $dbuser="4nU53r";
          				    $dbpass="G0m0$0f7_2014";
          				    $dbname="broadcast";
          				    $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);  
          				    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
          				    return $dbh;
          		
          		}else{
          			       $dbhost="broadcastservice.db.11019016.hostedresource.com";
          				    $dbuser="broadcastservice";
          				    $dbpass="Bro@dcast2015";
          				    $dbname="broadcastservice";
          				    $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);  
          				    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
          				    return $dbh;
          		}
          }
	}
 
/*
Friendly Name
Broadcast 

Database name and username 
broadcastservice

Hostname
broadcastservice.db.11019016.hostedresource.com
*/

 ?>

