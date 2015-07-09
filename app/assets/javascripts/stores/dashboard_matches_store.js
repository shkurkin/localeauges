var DashboardMatchConstants = {
  CHANGE_ACTIVE_MATCH: "CHANGE_ACTIVE_MATCH",
  DASHBOARD_LOAD_GON_FROM_DOM: "DASHBOARD_LOAD_GON_FROM_DOM"
}

var DashboardMatchStore = Fluxxor.createStore({
  initialize: function() {
    if(typeof(gon) == 'undefined' || typeof(gon.matches) == 'undefined'){
      this.matches = {};
      this.matches.loadedFromGon = false;
      this.matches.all = [];
      this.matches.active = 0;
    }

    this.bindActions(
      DashboardMatchConstants.CHANGE_ACTIVE_MATCH, this.onChangeActiveMatch,
      DashboardMatchConstants.DASHBOARD_LOAD_GON_FROM_DOM, this.onDashboardLoadGonFromDom
    );
  },

  onChangeActiveMatch: function(active) {
    this.matches.active = active;
    this.emit("change");
  },

  onDashboardLoadGonFromDom: function(domGon) {
    this.matches = domGon;
    this.matches.loadedFromGon = true;
    this.emit("change");
  },

  getState: function() {
    return this.matches
  }
})

var DashboardMatchActions = {
  changeActiveMatch: function(active) {
    this.dispatch(DashboardMatchConstants.CHANGE_ACTIVE_MATCH, active)
  },

  dashboardLoadGonFromDom: function(gonDom) {
    this.dispatch(DashboardMatchConstants.DASHBOARD_LOAD_GON_FROM_DOM, gonDom);
  }
}
