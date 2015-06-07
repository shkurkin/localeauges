var NewMatchDetailPlayers = React.createClass({
  propTypes: {
    players: React.PropTypes.array
  },

  render: function() {
    var players = this.props.players.map(function(user) {
      return (<li>{user.email}</li>);
    }.bind(this));

    return (
      <ul className="new-match-players">
        {players}
      </ul>
    )
  }
});