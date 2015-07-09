var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var DashboardMatchesSelectInner = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("DashboardMatchStore")],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return flux.store("DashboardMatchStore").getState();
  },

  render: function() {
    var panelHeader = <PanelHeader title="Upcoming Matches" />;
    var matches = this.state.all.map(function(match){
      var teams = match.teams.map(function(team, i) {
        return team.name
      })
      var date = moment(new Date(match.datetime)).format('dddd MMMM Do - h:mm');
      return <div>{teams.join(" VS ")}<br />{date}</div>
    })
    return (
      <div className="col-md-4 col-sm-4">
        <Panel header={panelHeader}>
          <div>
            {matches}
          </div>
        </Panel>
      </div>
    );
  }
});

var DashboardMatchesSelect = React.createClass({
  render: function() {
    return (
      <div>
        <DashboardMatchesSelectInner flux={flux} />
      </div>
    );
  }
});
