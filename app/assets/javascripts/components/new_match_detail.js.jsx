var NewMatchDetail = React.createClass({
  propTypes: {
    t1Players: React.PropTypes.array,
    t2Players: React.PropTypes.array,
    t1Team: React.PropTypes.array,
    t2Team: React.PropTypes.array,
    date: React.PropTypes.string,
    time: React.PropTypes.string,
    location: React.PropTypes.object,
    t1NewName: React.PropTypes.string,
    t2NewName: React.PropTypes.string
  },

  render: function() {
    var team1, team2;
    if(this.props.t1Team.length)
      team1 = <NewMatchDetailTeam teamData={this.props.t1Team} />;
    else if (this.props.t1Players.length)
      team1 = <NewMatchDetailPlayers players={this.props.t1Players} teamName={this.props.t1NewName} />;
    else
      team1 = <div><h2>Team 1</h2></div>;

    if(this.props.t2Team.length)
      team2 = <NewMatchDetailTeam teamData={this.props.t2Team} />;
    else if (this.props.t2Players.length)
      team2 = <NewMatchDetailPlayers players={this.props.t2Players} teamName={this.props.t2NewName} />;
    else
      team2 = <div><h2>Team 2</h2></div>;
    var date = moment(new Date(this.props.date)).format('dddd, MMMM Do');

    return(
      <div className="row">
        <div className="col-md-12 match-detail-vs">
          <div className="row">
            <div className="col-md-12">
              <h1 style={{marginTop: "0", textAlign: "center"}}>Match Details</h1>
            </div>
            <div className="col-md-5" style={{textAlign: 'right'}}>
              {team1}
            </div>
            <div className="col-md-2" style={{textAlign: 'center'}}>
             <h2>VS</h2>
            </div>
            <div className="col-md-5">
              {team2}
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 detail-date">
              {date} @ {this.props.time}
            </div>
            <div className="col-md-12 detail-location">
                <div className="detail-location-title">
                  {this.props.location.nickname}
                </div>
                <div className="detail-location-address">
                  {this.props.location.address}
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});