var app = angular.module('broadcast',['ngRoute','ngResource','ngAnimate']);

function companyCtrl($scope, $http){


   $scope.load = function(){

          $http.get('rest/company')
          .success( function(r){
            // console.log("success"+r);

            console.log(r);

              r.info = JSON.parse(r.info);
              $scope.company = r;

           } );

   }


   $scope.update = function(){
    
    console.log($scope.company);

    $scope.company = JSON.stringify($scope.company);

       $http.put('rest/company/'+$scope.company.id, $scope.company, {
          withCredentials: true,
          headers: {'Content-Type': undefined },
          transformRequest: angular.identity
           }).success( function(r){
             console.log("Success: ", r);            
           } )
           .error(function(err){
            console.log("Error: ", err);
           });

   }
}


app.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/',{
		templateUrl: 'views/login.html', 
	  	controller: 'LoginCtrl',
      sessionAccess: false
	});
	$routeProvider.when('/brands',{
		templateUrl: 'views/brands.html',
		controller: 'BrandListCtrl',
    sessionAccess: true
	});
	$routeProvider.when('/brand/new',{
		templateUrl: 'views/newBrand.html',
		controller: 'BrandNewCtrl',
    sessionAccess: true
	});
	$routeProvider.when('/brand/:id',{
		templateUrl: 'views/updateBrand.html',
		controller: 'BrandEditCtrl',
    sessionAccess: true
	});
  $routeProvider.when('/brand/delete/:id',{
    templateUrl: 'views/deleteBrand.html',
    controller: 'BrandEditCtrl',
    sessionAccess: true
  });
  $routeProvider.when('/users/:id',{
    templateUrl: 'views/updateUser.html',
    controller: 'UsersEditCtrl',
    sessionAccess: true
  });
  $routeProvider.when('/user',{
    redirectTo:'/users/1',
    sessionAccess: true
  });
  $routeProvider.when('/logout',{
    templateUrl: 'views/logout.html',
    sessionAccess: true
  });
   $routeProvider.when('/company',{
    templateUrl: 'views/company.html',
    controller: 'companyCtrl',    
    sessionAccess: true
  });
   $routeProvider.when('/email',{
    templateUrl: 'views/sendEmail.html',
    controller: 'emailCtrl',    
    sessionAccess: true
  });
   $routeProvider.when('/email-cfg',{
    templateUrl: 'views/updateEmailConfig.html',
    controller: 'emailCtrl',    
    sessionAccess: true
  });
}])
.factory(

  'UsersResource', 
  ['$resource', 

function($resource) {

  var rest = $resource(
    'rest/users/:id',
    {
      'id': ''
    }, 
    {
      'update': { 'method': 'PUT' }
    }
  );

  return rest;

}])
.factory(

  'EmailResource', 
  ['$resource', 

function($resource) {

  var rest = $resource(
    'rest/email/:id',
    {
      'id': ''
    }, 
    {
      'update': { 'method': 'PUT' }
    }
  );

  return rest;

}])
.factory(

  'BrandsResource', 
  ['$resource', 

function($resource) {

  var rest = $resource(
    'rest/brands/:id',
    {
      'id': ''
    }, 
    {
      'update': { 'method': 'PUT' }
    }
  );

  return rest;

}])
.controller(
  'BrandListCtrl',
function ($scope, BrandsResource) {
  BrandsResource.query(null, function(result) {
    $scope.brands = result;
    // console.log($cookies);
  });

})
.controller(

  'BrandNewCtrl',

  ['$scope', 'BrandsResource', '$location','$http',

function ($scope, resource, $location,$http) {
	$scope.showButton = true;

	$scope.fileNameChanged = function(e){
		$scope.brand.image=e.value;
		 var fd = new FormData();
	    fd.append("file", e[0]);

	    $http.post('rest/upload', fd, {
	        withCredentials: true,
	        headers: {'Content-Type': undefined },
	        transformRequest: angular.identity
	    }).success( function(r){
	    	// console.log("success"+r);
	    } );
	}
  	$scope.brand = new resource({
	    'id':0, 
	    'name': '',
	    'image':''
	});

  $scope.save = function() {
	$scope.showButton = false;
    $scope.brand.$save(function(res) {
      $location.path('/brands');
    });
  };


  $scope.get = function(){

    console.log('hey')
     
     $http
     .get('rest/brands')
     .success(function(rs){
         $scope.brand.order = rs.length + 1;
     });


   }

}])
.controller(

  'BrandEditCtrl',

  ['$scope', 'BrandsResource', '$routeParams', '$window', '$location', 

function ($scope, resource, $routeParams, $window, $location) {
  $scope.showButton = true;
  $scope.frm_show = true;
  $scope.currentId = $routeParams.id;

  resource.get({id: $routeParams.id}, function(result) {
    $scope.brand = result;  
    // console.log(result);
  });


   $scope.get = function(){

    cosole.log('hey')
     
     $http
     .get('rest/brands')
     .success(function(rs){
         $scope.brand.order = rs.length;
     });


   }

  
  $scope.save = function() {
    $scope.showButton = false;
    $scope.showUploader = false;
    $scope.brand.$update({id: $routeParams.id}, function(res) {
      console.log(res)
      $window.alert("Brand Updated!");
    });
  };
  
  $scope.showConfirm = false;
  
  $scope.delete = function() {
    $scope.showConfirm = true;
  };

  $scope.cancelDelete = function() {
    $scope.showConfirm = false;
  };

  $scope.destroy = function() {
    $scope.brand.$delete({id: $routeParams.id}, function(res) {
      $scope.showConfirm = false;
      $location.path('/brands');
    });
  };

}])
.controller(

  'emailCtrl',

  ['$scope', 'EmailResource', '$routeParams', '$window', '$location', 

function ($scope, resource, $routeParams, $window, $location) {
  $scope.showButton = true;
  // $scope.frm_show = true;

    resource.query(null, function(result) {
      $scope.email = result;
      $scope.email.host = result[0].host;
      $scope.email.port = result[0].port;
      $scope.email.encryption = result[0].encryption;
      $scope.email.username = result[0].username;
      $scope.email.password = result[0].password;
    });
  
  
  $scope.showConfirm = false;


}])
.controller(

  'UsersEditCtrl',

  ['$scope', 'UsersResource', '$routeParams', '$window', '$location', 

function ($scope, resource, $routeParams, $window, $location) {
  $scope.showButton = true;
  $scope.showButtonP= true;
  $scope.currentId = $routeParams.id;
  resource.get({id: $routeParams.id}, function(result) {
    $scope.user = result;
    // console.log(result);
  });
  
  $scope.save = function() {
    $scope.showButton = false;
    $scope.user.$update({id: $routeParams.id}, function(res) {
    // console.log(res);

      $window.alert("User Updated!");
    });
  };
  

}])
.controller(

  'LoginCtrl',

  ['$scope', '$location','$http', 

function ($scope, $location,$http) {
  $scope.showButton = true;
  $scope.user = {}
  $scope.login = function() {

      
       $http({
          url: 'rest/login',
          method: "POST",
          data: $scope.user
      })
      .then(function(res) {
              // console.log(res)
          }, 
          function(res) { 
          }
      );

  }
  

}]).controller('adminCtrl',function ($scope,$route,$http,$location) {
    $scope.checkAccess = function(){
        $http({
          url: 'rest/login',
          method: "get"
      }).then(function(res){
        console.log($route.current.sessionAccess);
        if (!res.data.response && $route.current.sessionAccess)
          $location.path('/');
      });
    }
    $scope.$on('$routeChangeStart', function() {
      $scope.checkAccess();
    });
  })
.controller('companyCtrl', companyCtrl)
;

