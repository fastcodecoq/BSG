
var map;
var styles = [
   {"featureType":"water","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":-78},{"lightness":67},{"visibility":"simplified"}]},{"featureType":"landscape","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"geometry","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"simplified"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#ffffff"},{"saturation":-100},{"lightness":100},{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"hue":"#e9ebed"},{"saturation":-90},{"lightness":-8},{"visibility":"simplified"}]},{"featureType":"transit","elementType":"all","stylers":[{"hue":"#e9ebed"},{"saturation":10},{"lightness":69},{"visibility":"on"}]},{"featureType":"administrative.locality","elementType":"all","stylers":[{"hue":"#2c2e33"},{"saturation":7},{"lightness":19},{"visibility":"on"}]},{"featureType":"road","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":31},{"visibility":"on"}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"hue":"#bbc0c4"},{"saturation":-93},{"lightness":-2},{"visibility":"simplified"}]},{
        featureType: "all",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      }

];                     

function initialize() {
  var mapOptions = {
    zoom: 2,
    center: new google.maps.LatLng(27.0591,-16.1719),
    rotateControl: false,
    scaleControl: false,
    zoomControl: false,
    scrollwheel: false,
    panControl: false,
    draggable: false,
    maxZoom: 2,
    minZoon: 2,
    mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
        }
    };


    var styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});

    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    marker = new google.maps.Marker({
	    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
	    map: map
	});

    map.data.loadGeoJson("js/map/map.geojson");
    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

}

google.maps.event.addDomListener(window, 'load', initialize);

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
    $.getJSON( "admin/rest/brands", function( data ) {
        console.log(data);
      var items = [];
      $.each( data, function( key, val ) {
        items.push( "<li id='" + val.id + "'> <img src='img/uploads/"+val.image+"' alt=''></li>" );
      });
     $("#brands_items").append(items);
    });
});