
var map;
var Config = {
      api : {
          url : "http://gomosoft.com/customers/bsg"
      }
  }

function initialize() {

var styles = [
    {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
            { hue: '#dddddd' },
            { saturation: -100 },
            { lightness: -3 },
            { visibility: 'on' }
        ]
    },{
        featureType: 'water',
        elementType: 'all',
        stylers: [
            { hue: '#c9c9c9' },
            { saturation: -100 },
            { lightness: 12 },
            { visibility: 'on' }
        ]
    },{
        featureType: 'road',
        elementType: 'all',
        stylers: [
            { hue: '#cccccc' },
            { saturation: -100 },
            { lightness: 44 },
            { visibility: 'on' }
        ]
    },{
        featureType: 'poi',
        elementType: 'all',
        stylers: [
            { hue: '#dddddd' },
            { saturation: -100 },
            { lightness: 39 },
            { visibility: 'on' }
        ]
    }
];


  var options = {
    zoom: 12,
    center: new google.maps.LatLng(27.0591,-16.1719),    
    minZoon: 12,
    mapTypeId: 'Broadcast',
    mapTypeControlOptions: {
        mapTypeIds: ['Broadcast']
        }
    };



    map = new google.maps.Map(document.getElementById('map'), options);
   
    marker = new google.maps.Marker({
	    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
	    map: map,
        position :  new google.maps.LatLng(27.0591,-16.1719)
	});

    var styledMap = new google.maps.StyledMapType(styles,{name: "Broadcast"});       
    map.mapTypes.set('Broadcast', styledMap);    

}

//google.maps.event.addDomListener(window, 'load', initialize);




function config ($stateProvider, $urlRouterProvider, $httpProvider){

      $stp = $stateProvider;


     console.log($stp);
     

}


function apiFactory($http){

     this.baseUrl = Config.api.url;     
     this.apiUri = '/admin/rest';     
     this.uri = '';

     this.brands = function(){ this.uri = '/brands'; return this; }
     this.company = function(){ this.uri = '/company'; return this; }
     this.map = function(){ this.uri = '/map'; return this; }

     this.reset = this.destroy = function(){this.uri = ''; return this;}

     this.get = function(){ var req = $http.get(this.baseUrl + this.apiUri + this.uri); this.reset(); return req; }

     return this;

}


  function brandsCtrl($scope, $rootScope, API){

      $scope.path = Config.api.url;

      $scope.load = function(){

      API
      .brands()
      .get()
      .success(function(rs){
         $scope.brands = rs;
      }) 
      .error(function(err){
          console.log(err);
      });

       }    

   }


 angular
   .module('BSG', ['ui.router'])
   .factory('API', apiFactory)
   .config(config)
   .controller('brandsCtrl', brandsCtrl)
   .controller('mainCtrl', function(){})
   .run(function($rootScope){

      //run stuff 
 
   });



$(function() {
    $("#forms").click(function(e){
        $("#container_forms").slideToggle();
    });
    $("#slides").slippry({
        controls: false,
        elements:'article'
    });
    var testimonials = $("#testimonials").slippry({
        controls: false,
        elements: 'article',
        transition: 'horizontal',
        pager:false
    });

    $('.prev').click(function () {
        testimonials.goToPrevSlide();
        return false;
    });
    $('.next').click(function () {
        testimonials.goToNextSlide();
        return false;
    });

   //deprecated method this was moved to brandsCtrl of module BSG  (angularjs)

/*    $.getJSON( Config.api.url + "/admin/rest/brands", function( data ) {
        console.log(data);
      var items = [];
      $.each( data, function( key, val ) {
        items.push( "<li id='" + val.id + "'> <img src='img/uploads/"+val.image+"' alt=''></li>" );
      });
     $("#brands_items").append(items);
    });
*/

  $('.img-holder').imageScroll();

});