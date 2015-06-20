var NewMatchDetailPlayers = React.createClass({
  propTypes: {
    players: React.PropTypes.array,
    teamName: React.PropTypes.string
  },

  render: function() {
    var players = this.props.players.map(function(user) {
      return (<li key={user.id} data-id={user.id}>{user.email}</li>);
    }.bind(this));

    return (
      <div>
        <h2>{this.props.teamName}</h2>
        <ul className="new-match-players">
          {players}
        </ul>
      </div>
    )
  }
});