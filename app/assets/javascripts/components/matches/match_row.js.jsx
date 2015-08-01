var MatchRow = React.createClass({
  propTypes: {
    match: React.PropTypes.object
  },

  render: function() {
    var match = this.props.match;
    var usersTeam, opponentsTeam, results, record;
    match.teams.forEach(function(team){
      if(team.users_team)
        usersTeam = team;
      else
        opponentsTeam = team;
    });
    var datetime = moment(new Date(match.datetime)).format('dddd MMMM Do - h:mm a');
    if(match.results.length == 0){
      results = "--";
      record = <span className="btn btn-default btn-xs"> -- </span>;
    }

    return (
      <tr>
        <td>
          {usersTeam.name} VS. {opponentsTeam.name}<br />
          <small>{datetime}</small>
        </td>
        <td>{match.location.name}</td>
        <td>{results}</td>
        <td>{record}</td>
        <td>
          <span className="btn btn-info btn-xs"><i className="fa fa-pencil-square-o"></i> Record Results</span>
        </td>
      </tr>
    );
  }
});
