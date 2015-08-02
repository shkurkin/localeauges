var MatchesConstants = {
    MATCHES_FRESHEN: "MATCHES_FRESHEN",
    UPDATE_RESULTS: "UPDATE_RESULTS"
}

var MatchesStore = Fluxxor.createStore({
  initialize: function() {
    if(typeof(gon) == 'undefined' || typeof(gon.matches) == 'undefined'){
      this.matches = {};
      this.matches.all = [];
      this.matches.fresh = false;
    }

    this.bindActions(
      MatchesConstants.MATCHES_FRESHEN, this.onMatchesFreshen,
      MatchesConstants.UPDATE_RESULTS, this.onUpdateResults
    );
  },

  onMatchesFreshen: function(data) {
    this.matches = data;
    this.matches.fresh = true;
    this.emit("change");
  },

  onUpdateResults: function(data) {
    var matches = this.matches.all.map(function(match) {
      if(match.id == data.id) {
        match.results = data.results;
        return match;
      } else {
        return match;
      }
    });
    this.matches.all = matches;
    this.emit("change");
  },

  getState: function() {
    return this.matches
  }
});

var MatchesActions = {
  matchesFreshen: function(data) {
    this.dispatch(MatchesConstants.MATCHES_FRESHEN, data);
  },

  updateResults: function(data) {
    this.dispatch(MatchesConstants.UPDATE_RESULTS, data);
  }
}
