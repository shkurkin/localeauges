var NewMatchDetail = React.createClass({
  propTypes: {
    t1Players: React.PropTypes.array,
    t2Players: React.PropTypes.array,
    t1Team: React.PropTypes.array,
    t2Team: React.PropTypes.array
  },

  render: function() {
    return(
      <div className="row">
        <div className="col-md-12 match-detail-vs">
          <div className="row">
            <div className="col-md-5">
              <NewMatchDetailTeam team={this.props.t1Team} />
              <NewMatchDetailPlayers players={this.props.t1Players} />
            </div>
            <div className="col-md-2">
             VS
            </div>
            <div className="col-md-5">
              <NewMatchDetailTeam team={this.props.t2Team} />
              <NewMatchDetailPlayers players={this.props.t2Players} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});