var MatchesConstants = {
    MATCHES_FRESHEN: "MATCHES_FRESHEN"
}

var MatchesStore = Fluxxor.createStore({
  initialize: function() {
    if(typeof(gon) == 'undefined' || typeof(gon.matches) == 'undefined'){
      this.matches = {};
      this.matches.all = [];
      this.matches.fresh = false;
    }

    this.bindActions(
      MatchesConstants.MATCHES_FRESHEN, this.onMatchesFreshen
    );
  },

  onMatchesFreshen: function(data) {
    this.matches = data;
    this.matches.fresh = true;
    this.emit("change");
  },

  getState: function() {
    return this.matches
  }
});

var MatchesActions = {
  matchesFreshen: function(data) {
    this.dispatch(MatchesConstants.MATCHES_FRESHEN, data);
  }
}
