var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var DashboardNextMatchInner = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("DashboardMatchStore")],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return flux.store("DashboardMatchStore").getState();
  },

  componentDidMount: function() {
    if(!this.state.loadedFromGon)
      this.loadGonFromDom();
  },

  loadGonFromDom: function() {
     var domGon = eval($('#gonWrap > script').html());
     this.getFlux().actions.dashboardLoadGonFromDom(domGon);
  },

  render: function() {
    return (
      <div>
        FOO
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
