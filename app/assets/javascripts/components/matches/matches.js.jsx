var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var MatchesInner = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("MatchesStore")],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return flux.store("MatchesStore").getState();
  },

  componentDidMount: function() {
    if(!this.state.fresh)
      this.matchesFreshen();
  },

  matchesFreshen: function() {
    var domGon = eval($('#gonWrap > script').html());
    this.getFlux().actions.matchesFreshen(domGon);
  },

  updateResults(data) {
    this.getFlux().actions.updateResults(data);
  },

  recordResults(match_id) {
    var $modal = $(event.target).closest('.modal');
    var usersTeamScore = $modal.find('.users-team-score .match-score-input').val();
    var usersTeamDetail = $modal.find('.users-team-score .match-details').val();
    var usersTeamId = $modal.find('.users-team-score .team-id').val();
    var opponentsTeamScore = $modal.find('.opponents-team-score .match-score-input').val();
    var opponentsTeamDetail = $modal.find('.opponents-team-score .match-detail').val();
    var opponentsTeamId = $modal.find('.opponents-team-score .team-id').val();
    var data = {
      match_id: match_id,
      users_team_score: usersTeamScore,
      users_team_detail: usersTeamDetail,
      users_team_id: usersTeamId,
      opponents_team_score: opponentsTeamScore,
      opponents_team_detail: opponentsTeamDetail,
      opponents_team_id: opponentsTeamId
    };
    $.ajax({
      url: '/results/record_match_results',
      type: 'POST',
      dataType: 'json',
      data: data,
      success: function(data) {
        this.updateResults(data);
        $('.modal').modal('hide')
      }.bind(this),
      error: function(requestObject, error, errorThrown) {
        console.log('error: ' + error + ' errorThrown: ' + errorThrown);
      }
    });
  },

  render: function() {
    var matches = this.state.all.map(function(match){
      return (<MatchRow match={match} recordResults={this.recordResults.bind(this, match.id)} id={match.id} />);
    }.bind(this));
    return (
      <Widget containerSize="col-md-12 col-sm-12" headColor="#42CAC0" spanColor="#39B7AC" title="Matches" icon="fa fa-list">
        <table className="table table-hover p-table">
          <thead>
            <tr>
              <th>Match</th>
              <th>Location</th>
              <th>Results</th>
              <th>Record</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {matches}
          </tbody>
        </table>
      </Widget>
    )
  }
});

var Matches = React.createClass({
  render: function() {
    return (
      <div>
        <MatchesInner flux={flux} />
      </div>
    )
  }
})
