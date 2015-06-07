var NewMatchDetailTeam = React.createClass({
  propTypes: {
    team: React.PropTypes.array
  },

  render: function() {
    var team = this.props.team.map(function(t) {
      return (<li>{t.name}</li>);
    }.bind(this));

    return (
      <ul className="new-match-team">
        {team}
      </ul>
    )
  }
});