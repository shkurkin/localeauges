var NewMatchDetail = React.createClass({
  propTypes: {
    t1Players: React.PropTypes.array,
    t2Players: React.PropTypes.array,
    t1Team: React.PropTypes.array,
    t2Team: React.PropTypes.array,
    date: React.PropTypes.string,
    time: React.PropTypes.string
  },

  render: function() {
    return(
      <div className="row">
        <div className="col-md-12 match-detail-vs">
          <div className="row">
            <div className="col-md-5">
              <NewMatchDetailTeam teamData={this.props.t1Team} />
              <NewMatchDetailPlayers players={this.props.t1Players} />
            </div>
            <div className="col-md-2">
             VS
            </div>
            <div className="col-md-5">
              <NewMatchDetailTeam teamData={this.props.t2Team} />
              <NewMatchDetailPlayers players={this.props.t2Players} />
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 detail-date">
                Date: {this.props.date}
            </div>
            <div className="col-md-12 detail-time">
                Time: {this.props.time}
            </div>
          </div>
        </div>
      </div>
    );
  }
});