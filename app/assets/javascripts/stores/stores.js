var stores =  {};

var actions = {};

var flux = new Fluxxor.Flux(stores, actions);

flux.on("dispatch", function(type, payload) {
  if(console && console.log) {
    console.log('[Dispatch]', type, payload);
  }
});