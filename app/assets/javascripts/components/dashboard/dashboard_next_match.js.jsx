var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var DashboardNextMatchInner = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("DashboardMatchStore")],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return flux.store("DashboardMatchStore").getState();
  },

  componentDidMount: function() {
    if(!this.state.fresh)
      this.dashboardFreshen();
  },

  dashboardFreshen: function() {
     var domGon = eval($('#gonWrap > script').html());
     this.getFlux().actions.dashboardFreshen(domGon);
  },

  render: function() {
    if(this.state.all.length == 0)
      return <div>No Upcoming Matches</div>
    var activeMatch = this.state.all[this.state.active];
    return (
      <div>
        <Match teams={activeMatch.teams} datetime={activeMatch.datetime} location={activeMatch.location} />
      </div>
    )
  }
});

var DashboardNextMatch = React.createClass({
  render: function() {
    return (
      <Widget containerSize="col-md-8 col-sm-8" headColor="#57C8F2" spanColor="#21759B" title="Next Match" icon="fa fa-bolt">
        <DashboardNextMatchInner flux={flux} />
      </Widget>
    );
  }
})
