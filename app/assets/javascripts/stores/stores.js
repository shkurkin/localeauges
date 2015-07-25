var stores =  {
  NewMatchStore: new NewMatchStore(),
  DashboardMatchStore: new DashboardMatchStore(),
  MatcesStore: new MatchesStore()
};

var actions = {};
$.extend(actions, NewMatchActions);
$.extend(actions, DashboardMatchActions);
$.extend(actions, MatchesActions);

var flux = new Fluxxor.Flux(stores, actions);

flux.on("dispatch", function(type, payload) {
  if(console && console.log) {
    console.log('[Dispatch]', type, payload);
  }
});
