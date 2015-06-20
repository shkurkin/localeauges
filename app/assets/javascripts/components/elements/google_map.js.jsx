var GoogleMap = React.createClass({
  propTypes: {
    locations: React.PropTypes.array,
    changeLocationFunction: React.PropTypes.func
  },

  componentDidMount: function(){
    var mapOptions = {
      center: new google.maps.LatLng(-34.397, 150.644),
      zoom: 10
    };
    this.map = new google.maps.Map(this.refs.gMap.getDOMNode(), mapOptions);
    this.setLocation(this.map);
    this.makeMarkers(this.props.locations, this.map);
  },

  componentWillUpdate: function(nextProps){
    this.makeMarkers(nextProps.locations, this.map);
  },

  setLocation: function(map) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        map.setCenter(initialLocation);
      });
    }
  },

  makeMarkers: function(locations, map) {
    var infoWindow = null;
    for (var i = 0; i < locations.length; i++) {
      var location = locations[i];
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(location.lat, location.lng),
        map: map,
        title: location.nickname
      });
      var active = null;
      marker.info = new google.maps.InfoWindow({
          content: "<div><div class='location-info-title'>"+location.nickname+"</div><div class='location-info-address'"+location.address+"></div></div>"
      });
      marker.updateFunc = this.props.changeLocationFunction;
      marker.nickname = location.nickname;
      marker.address = location.address;
      marker.id = location.id;
      google.maps.event.addListener(marker, 'click', function(){
        if(active)
          active.close();
        this.info.open(map, this);
        this.updateFunc(this.nickname, this.address, this.id);
        active = this.info;
      })
    };
  },

  render: function() {
    return(
      <div id="gMap">
        <div ref="gMap" style={{height: '350px'}}>
        </div>
      </div>
    );
  }
});