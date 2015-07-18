var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var DashboardMatchesSelectInner = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("DashboardMatchStore")],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return flux.store("DashboardMatchStore").getState();
  },

  changeActive: function(newActive) {
    this.getFlux().actions.changeActiveMatch(newActive);
  },

  render: function() {
    var panelHeader = <PanelHeader title="Upcoming Matches" />;
    var matches = this.state.all.map(function(match, i){
      var teams = match.teams.map(function(team) {
        return team.name
      })
      var date = moment(new Date(match.datetime)).format('dddd MMMM Do - h:mm a');
      var style = {};
      if(this.state.active == i)
        style = {textDecoration: 'underline'};
      return <div className={"select-match " + (i == 0 ? 'first': '')} style={style} onClick={this.changeActive.bind(this, i)}><span className="select-teams">{teams.join(" VS ")}</span><br /><small>{date}</small></div>
    }.bind(this))
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
