var GoogleMap = React.createClass({
  propTypes: {
    locations: React.PropTypes.array,
    center: React.PropTypes.object,
    zoom: React.PropTypes.number,
    changeLocationFunction: React.PropTypes.func,
    centerOnUser: React.PropTypes.bool,
    singleLocation: React.PropTypes.bool
  },

  markers: [],

  getDefaultProps: function() {
    return {
      center: {lat: 34.05, lng: -118.25},
      zoom: 10,
      singleLocation: false
    }
  },

  componentDidMount: function(){
    var mapOptions = {
      center: new google.maps.LatLng(this.props.center.lat, this.props.center.lng),
      zoom: this.props.zoom
    };
    this.map = new google.maps.Map(this.refs.gMap.getDOMNode(), mapOptions);
    if(this.props.centerOnUser)
      this.setUserLocation(this.map);
    this.makeMarkers(this.props.locations, this.map);
  },

  componentWillUpdate: function(nextProps){
    if(this.props.singleLocation) {
      this.map.panTo(new google.maps.LatLng(nextProps.center.lat, nextProps.center.lng));
      this.clearMarkers();
    }
    this.makeMarkers(nextProps.locations, this.map);
  },

  clearMarkers: function(){
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(null);
    }
  },

  setUserLocation: function(map) {
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
        title: location.name
      });
      this.markers.push(marker);
      var active = null;
      marker.info = new google.maps.InfoWindow({
          content: "<div><div class='location-info-title'>"+location.name+"</div><div class='location-info-address'"+location.address+"></div></div>"
      });
      marker.updateFunc = this.props.changeLocationFunction;
      marker.name = location.name;
      marker.address = location.address;
      marker.id = location.id;
      google.maps.event.addListener(marker, 'click', function(){
        if(active)
          active.close();
        this.info.open(map, this);
        this.updateFunc(this.name, this.address, this.id);
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
