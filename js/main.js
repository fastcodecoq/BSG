
var map;
window.Config = {  
      env : "dev",
      api : {
          url : "http://gomosoft.com/customers/bsg"
      }
  };

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

       $httpProvider.interceptors.push(function(){
        return {
           'request': function(config) {
             

                return config || $q.when(config);
            },
            'response': function(response) {
                
                 if(window.Config.env.match('qa|dev'))
                    console.log('Response: ', response);
                 

               return response;
            },
            'responseError' : function(err){ 


                return err;
            }
        };
    });

     

}


function apiFactory($http){

     this.baseUrl = window.Config.api.url;     
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


   function videoCtrl($scope){

      $scope.videoHtml = '<iframe src="//player.vimeo.com/video/64999318?title=0&amp;byline=0&amp;portrait=0&amp;autoplay=1" style="width:100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
      $video = angular.element('*[data-video]');
      $videoWrap = angular.element('*[data-video-wrap]');
      $syslides = jQuery('.sy-pager');
      $body = angular.element('body, html');
      $dClose = angular.element('*[data-close]');

      $scope.load = function(){


         $syslides.css('cssText', 'display: none !important');
         $body.css({overflow:'hidden'});
         $video.show(function(){
              $dClose.addClass('transitioned');
              $dClose.css('transform', 'translate3d(' + (angular.element(window).width() - 60) + 'px,60px,0)');
              $videoWrap.html($scope.videoHtml);
         });

      }

      $scope.destroy = function(){
        
        $video.hide(function(){
           $body.css({overflow:'auto'});            
           $syslides.css('cssText', 'display: block !important');  
            $dClose.css('transform', 'translate3d( 100px,60px,0)');       
           $videoWrap.find('iframe').remove();                             
        });

      }

   }


  function companyCtrl($scope, API){

    $scope.load = function(){

          API
          .company()
          .get()
          .success(function(rs){

            rs.info = JSON.parse(rs.info);
            rs.info.location.short_state = rs.info.location.state.substring(0,2).toUpperCase();

            $scope.company = rs;

          });


    }

  }


 angular
   .module('BSG', ['ui.router'])
   .factory('API', apiFactory)
   .config(config)
   .run(function($rootScope, $http){

      //run stuff 


     /* $http.get('js/Config.json')
      .success(function(rs){

          window.Config = rs;

      });*/
 
   })
   .controller('brandsCtrl', brandsCtrl)
   .controller('videoCtrl', videoCtrl)
   .controller('companyCtrl', companyCtrl)
   .controller('mainCtrl', function(){});




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