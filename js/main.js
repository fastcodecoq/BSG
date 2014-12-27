
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

      API
      .brands()
      .get()
      .success(function(rs){
         console.log(rs);
      }) 
      .error(function(err){
          console.log(err);
      })    

   }


 angular
   .module('BSG', ['ui.router'])
   .factory('API', apiFactory)
   .config(config)
   .controller('brandsCtrl', brandsCtrl)
   .controller('mainCtrl', function(){})
   .run(function($rootScope){

       $rootScope.brands = [{"id":"1","name":"Rooms to go","image":"Rooms_to_go.png"},{"id":"2","name":"WinnDixie","image":"WinnDixie.png"},{"id":"3","name":"TimeWarner","image":"TimeWarner.png"},{"id":"4","name":"Discovery Channel","image":"Discovery_Channel.png"},{"id":"5","name":"Universal Studios Florida","image":"Universal_Studios_Florida.png"},{"id":"7","name":"UniversalOrlado","image":"UniversalOrlado.png"},{"id":"8","name":"Comcast","image":"Comcast.png"},{"id":"9","name":"Bass Pro Shop","image":"Bass_Pro_Shop.png"},{"id":"10","name":"JimmyKimmel","image":"JimmyKimmel.png"},{"id":"11","name":"TobaccoFreeFL","image":"TobaccoFreeFL.png"},{"id":"12","name":"EllenShow","image":"EllenShow.png"},{"id":"13","name":"iVillage","image":"iVillage.png"},{"id":"14","name":"HomeMatters","image":"HomeMatters.png"},{"id":"15","name":"RosieODonnell","image":"RosieODonnell.png"},{"id":"16","name":"Telepictures","image":"Telepictures.png"},{"id":"17","name":"TNA","image":"TNA.png"},{"id":"18","name":"UnitedNations","image":"UnitedNations.png"},{"id":"19","name":"Pavarotti","image":"Pavarotti.png"},{"id":"20","name":"Telefood","image":"Telefood.png"},{"id":"21","name":"Aflac","image":"Aflac.png"},{"id":"22","name":"ABCCollegeFootball","image":"ABCCollegeFootball.png"},{"id":"23","name":"CBS","image":"CBS.png"},{"id":"24","name":"NBC","image":"NBC.png"},{"id":"25","name":"NBCsports","image":"NBCsports.png"},{"id":"26","name":"ESPN","image":"ESPN.png"},{"id":"27","name":"FOXsports","image":"FOXsports.png"},{"id":"28","name":"FOXintl","image":"FOXintl.png"},{"id":"29","name":"Univision","image":"Univision.png"},{"id":"30","name":"ImpactWrestling","image":"ImpactWrestling.png"},{"id":"31","name":"Telemundo","image":"Telemundo.png"},{"id":"32","name":"ITV","image":"ITV.png"},{"id":"33","name":"MajorLeagueSoccer","image":"MajorLeagueSoccer.png"},{"id":"34","name":"USopen","image":"USopen.png"},{"id":"35","name":"SuperLiga","image":"SuperLiga.png"},{"id":"36","name":"OrlandoMagic","image":"OrlandoMagic.png"},{"id":"37","name":"WorldSeries","image":"WorldSeries.png"},{"id":"38","name":"SuperBowlXLIII","image":"SuperBowlXLIII.png"},{"id":"39","name":"96Olympics","image":"96Olympics.png"},{"id":"40","name":"aTT","image":"aTT.png"},{"id":"41","name":"Bayer","image":"Bayer.png"},{"id":"42","name":"USarmy","image":"USarmy.png"},{"id":"43","name":"Pepsi","image":"Pepsi.png"}];

   })



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