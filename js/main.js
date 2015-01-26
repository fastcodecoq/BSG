'use strict';

var map;
window.Config = {  
      env : "dev",
      api : {
          url : ""
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

  var coords = new google.maps.LatLng(28.475842,-81.475575);
  var options = {
    zoom: 12,
    center: coords,    
    minZoon: 12,
    scrollwheel: false,
    mapTypeId: 'Broadcast',
    mapTypeControlOptions: {
        mapTypeIds: ['Broadcast']
        }
    };



   var map = new google.maps.Map(document.getElementById('map'), options);
   
   var marker = new google.maps.Marker({
	    icon: 'img/gray_dot.png',
	    map: map,
        position : coords
	});

    var styledMap = new google.maps.StyledMapType(styles,{name: "Broadcast"});       
    map.mapTypes.set('Broadcast', styledMap);    

}

google.maps.event.addDomListener(window, 'load', initialize);




function config ($stateProvider, $urlRouterProvider, $httpProvider){

      var $stp = $stateProvider;


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
     this.apiUri = 'admin/rest';     
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


   // function videoCtrl(){

   //    $scope.videoHtml = '';
   //    var $video = angular.element('*[data-video]');
   //    var $videoWrap = angular.element('*[data-video-wrap]');
   //    var $syslides = jQuery('.sy-pager');
   //    var $body = angular.element('body, html');
   //    var $dClose = angular.element('*[data-close]');

   //    $scope.load = function(){


         

   //    }

   //    $scope.destroy = function(){
        
   //      $video.hide(function(){
   //         $body.css({overflow:'auto'});            
   //         $syslides.css('cssText', 'display: block !important');  
   //          $dClose.css('transform', 'translate3d( 100px,60px,0)');       
   //         $videoWrap.find('iframe').remove();                             
   //      });

   //    }

   // }


  function companyCtrl($scope, API){

    $scope.load = function(){

        console.log('load')

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
   .controller('companyCtrl', companyCtrl)
   .controller('mainCtrl', function(){});




$(function() {
    $("#forms").click(function(e){
        $("#container_forms").slideToggle();
    });
    var slides = $("#slides").slippry({
        controls: false,
        elements:'article',

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
    $(".scrollA").click(function(event){
        event.preventDefault();
        var full_url = this.href;
        var parts = full_url.split("#");
        var trgt = parts[1];

        var target_offset = $("#"+trgt).offset();
        var target_top = target_offset.top;
        $('html, body').animate({scrollTop:target_top}, 1500);
    });

    var closeButton = $("#video-container span");
    var videoC = $("#video-container div");
    var videoContainer = $("#video-container");

    $('#slides a[data-href]').click(function(e){
        e.preventDefault();

        $('.sy-pager').fadeOut();
        $('body').css({overflow:'hidden'});
         
        var href= $(this).attr("data-href");
        var iframe = '<iframe src="'+href+'" style="width:100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';

       videoContainer.show(function(){
            videoC.html(iframe);
       });

    });
    closeButton.click(function(){
      videoContainer.hide(function(){videoC.html("");});
      $('.sy-pager').fadeIn();
      $('body').css({overflow:'auto'});
      
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