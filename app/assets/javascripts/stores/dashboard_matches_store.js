var DashboardMatchConstants = {
  CHANGE_ACTIVE_MATCH: "CHANGE_ACTIVE_MATCH",
  DASHBOARD_FRESHEN: "DASHBOARD_FRESHEN",
  MAKE_DASHBOARD_STALE: "MAKE_DASHBOARD_STALE"
}

var DashboardMatchStore = Fluxxor.createStore({
  initialize: function() {
    if(typeof(gon) == 'undefined' || typeof(gon.matches) == 'undefined'){
      this.matches = {};
      this.matches.fresh = false;
      this.matches.all = [];
      this.matches.active = 0;
    }

    this.bindActions(
      DashboardMatchConstants.CHANGE_ACTIVE_MATCH, this.onChangeActiveMatch,
      DashboardMatchConstants.DASHBOARD_FRESHEN, this.onDashboardFreshen,
      DashboardMatchConstants.MAKE_DASHBOARD_STALE, this.onMakeDashboardState
    );
  },

  onChangeActiveMatch: function(active) {
    this.matches.active = active;
    this.emit("change");
  },

  onDashboardFreshen: function(data) {
    this.matches = data;
    this.matches.fresh = true;
    this.emit("change");
  },

  onMakeDashboardState: function() {
    this.matches.fresh = false;
  },

  getState: function() {
    return this.matches
  }
})

var DashboardMatchActions = {
  changeActiveMatch: function(active) {
    this.dispatch(DashboardMatchConstants.CHANGE_ACTIVE_MATCH, active);
  },

  dashboardFreshen: function(data) {
    this.dispatch(DashboardMatchConstants.DASHBOARD_FRESHEN, data);
  },

  makeDashboardStale: function() {
    this.dispatch(DashboardMatchConstants.MAKE_DASHBOARD_STALE);
  }
}
