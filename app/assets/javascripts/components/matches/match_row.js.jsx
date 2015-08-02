var MatchRow = React.createClass({
  propTypes: {
    match: React.PropTypes.object,
    recordResults: React.PropTypes.func
  },

  determineResults: function(usersResult, opponentsResult) {
    return (
        <span>
          {usersResult.score} - {opponentsResult.score}
        </span>
    )
  },

  determineRecord: function(usersResult, opponentsResult) {
    if(usersResult.score == opponentsResult.score)
      return <span className="btn btn-default btn-xs"> Tie </span>
    else if (usersResult.score > opponentsResult.score)
      return <span className="btn btn-success btn-xs"> Win </span>
    else if (usersResult.score < opponentsResult.score)
      return <span className="btn btn-danger btn-xs"> Loss </span>
  },

  render: function() {
    var match = this.props.match;
    var usersTeam, usersResult, opponentsTeam, opponentsResult, results, record;
    match.teams.forEach(function(team){
      if(team.users_team)
        usersTeam = team;
      else
        opponentsTeam = team;
    });
    match.results.forEach(function(result){
      if(result.team_id == usersTeam.id)
        usersResult = result;
      if(result.team_id == opponentsTeam.id)
        opponentsResult = result;
    });
    var datetime = moment(new Date(match.datetime)).format('dddd MMMM Do - h:mm a');
    if(match.results.length == 0){
      results = "--";
      record = <span className="btn btn-default btn-xs"> -- </span>;
    } else {
      results = this.determineResults(usersResult, opponentsResult);
      record = this.determineRecord(usersResult, opponentsResult);
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
          <a data-toggle="modal" href={"#match"+match.id} className="btn btn-info btn-xs"><i className="fa fa-pencil-square-o"></i> Record Results</a>
          <div className="modal fade " id={"match"+match.id} tabIndex="-1" role="dialog" aria-labelledby="matchModal" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content">
                  <div className="modal-header" style={{background: "#00A8B3"}}>
                      <button type="button" className="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                      <h4 className="modal-title">{usersTeam.name} VS. {opponentsTeam.name}</h4>
                  </div>

                  <div className="modal-body">
                    <div className="row">
                      <div className="col-md-5">
                        <div className="users-team-score text-right">
                          <div className="score-title">Score for <b>{usersTeam.name}</b></div>
                          <input type="number" className="form-control match-score-input" />
                          <input type="hidden" className="team-id" value={usersTeam.id} />
                          <div className="score-title top-buffer">Details</div>
                          <textarea className="form-control match-details" rows="3"></textarea>
                        </div>
                      </div>
                      <div className="col-md-2 text-center">
                        <div className="modal-title">VS</div>
                      </div>
                      <div className="col-md-5">
                        <div className="opponents-team-score">
                          <div className="score-title">Score for <b>{opponentsTeam.name}</b></div>
                          <input type="number" className="form-control match-score-input" />
                          <input type="hidden" className="team-id" value={opponentsTeam.id} />
                          <div className="score-title top-buffer">Details</div>
                          <textarea className="form-control match-details" rows="3"></textarea>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="modal-footer">
                      <button data-dismiss="modal" className="btn btn-default" type="button">Close</button>
                      <button className="btn btn-success" type="button" onClick={this.props.recordResults}>Record Results</button>
                  </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    );
  }
});
