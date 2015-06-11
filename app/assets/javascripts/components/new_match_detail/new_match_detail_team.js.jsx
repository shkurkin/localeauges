var NewMatchDetailTeam = React.createClass({
  propTypes: {
    teamData: React.PropTypes.array
  },

  render: function() {
    if(this.props.teamData.length == 0){
      return (<div></div>);
    } else {
      var team = this.props.teamData[0];
      var users = team.users.map(function(user){
        return(<li key={user.id}>{user.email}</li>)
      });
      return (
        <div>
          <h2 key={team.id}>{team.name}</h2>
          <ul>
            {users}
          </ul>
        </div>
      )
    }
  }
});