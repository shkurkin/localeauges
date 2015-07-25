var Match = React.createClass({
  propTypes: {
    teams: React.PropTypes.array,
    datetime: React.PropTypes.string,
    location: React.PropTypes.object
  },

  render: function() {
    if(this.props.teams.length == 0)
      return <div className="no-match">No Matches Planned</div>
    var team1Players = this.props.teams[0].players.map(function(player){
      return <li>{player.email}</li>
    })
    var team1 = (
      <div className="col-md-5 col-sm-5 col-xs-5" style={{textAlign: 'right'}}>
        <h2>{this.props.teams[0].name}</h2>
        <ul className="new-match-players">
          {team1Players}
        </ul>
      </div>
    );

    var team2Players = this.props.teams[1].players.map(function(player){
      return <li>{player.email}</li>
    })
    var team2 = (
      <div className="col-md-5 col-sm-5 col-xs-5" style={{textAlign: 'left'}}>
        <h2>{this.props.teams[1].name}</h2>
        <ul className="new-match-players">
          {team2Players}
        </ul>
      </div>
    );

    var date = moment(new Date(this.props.datetime)).format('dddd MMMM Do & h:mm a');
    return (
      <div className="match">
        <div className="row">
          {team1}
          <div className="col-md-2 col-sm-2 col-xs-2" style={{textAlign: 'center'}}>
            <h2>VS</h2>
          </div>
          {team2}
        </div>
        <div className="row">
          <div className="col-md-12 detail-date">
            {date}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 detail-location">
              <a href={"https://www.google.com/maps/dir/Current+Location/" + this.props.location.address.split(' ').join('+') + "/"} target="_blank">
                <div className="detail-location-title">
                  {this.props.location.name}
                </div>
                <div className="detail-location-address next-match">
                    {this.props.location.address}
                    <div className="small">Click for directions</div>
                </div>
              </a>
              <GoogleMap locations={[this.props.location]} center={{lat: this.props.location.lat, lng: this.props.location.lng}} zoom={13} singleLocation={true} />
          </div>
        </div>
      </div>
    )
  }
})
