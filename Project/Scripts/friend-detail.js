var map;
var geocoder;
function initMap() {

    var mapOptions = {
        zoom: 17, //預設地圖的比例大小
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
    geocoder = new google.maps.Geocoder();
    geocodeAddress();
}

function geocodeAddress() {
    var addr = $("#addrDiv").text();
    geocoder.geocode({ 'address': addr }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
        }
        else {
            alert('地圖讀取錯誤: ' + status);
        }
    });
}

$(document).on('pageshow', '#mapPage', function () {
    initMap();
});
