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

  render: function() {
    var matches = this.state.all.map(function(match){
      console.log(match);
      return (<MatchRow match={match} />);
    });
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
