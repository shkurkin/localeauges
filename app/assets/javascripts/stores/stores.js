var stores =  {
  NewMatchStore: new NewMatchStore()
};

var actions = {};
$.extend(actions, NewMatchActions);

var flux = new Fluxxor.Flux(stores, actions);

flux.on("dispatch", function(type, payload) {
  if(console && console.log) {
    console.log('[Dispatch]', type, payload);
  }
});