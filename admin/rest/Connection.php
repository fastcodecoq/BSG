<?php 
	Class Connection{
		public function connection(){
		    // $dbhost="localhost";
		    // $dbuser="4nU53r";
		    // $dbpass="G0m0$0f7_2014";
		    // $dbname="broadcast";
		    // $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
		    $dbhost="localhost";
		    $dbuser="root";
		    $dbpass="";
		    $dbname="broadcast";
		    $dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass); 
		    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		    return $dbh;
		}
	}
 ?>