var NewMatchConstants = {
  INCLUDE_PLAYER: "INCLUDE_PLAYER",
  INCLUDE_TEAM: "INCLUDE_TEAM"
}

var NewMatchStore = Fluxxor.createStore({
  initialize: function() {
    if(typeof(gon) == 'undefined' || typeof(gon.newMatch) == 'undefined'){
      this.newMatch = {};
    } else {
      this.newMatch = gon.newMatch;
      this.newMatch.players = JSON.parse(this.newMatch.players);
      this.newMatch.teams = JSON.parse(this.newMatch.teams);
    }

    this.bindActions(
      NewMatchConstants.INCLUDE_PLAYER, this.onIncludePlayer,
      NewMatchConstants.INCLUDE_TEAM, this.onIncludeTeam
    );
  },

  onIncludePlayer: function(payload) {
    var t = payload.t
    var player = payload.player
    this.newMatch[t+'Players'].push({email: player});
    this.emit("change");
  },

  onIncludeTeam: function(payload) {
    var t = payload.t
    var team = payload.team
    this.newMatch[t+'Team'].push({name: team});
    this.emit("change");
  },

  getState: function() {
    return this.newMatch
  }
});

var NewMatchActions = {
  includePlayer: function(player) {
    this.dispatch(NewMatchConstants.INCLUDE_PLAYER, player);
  },

  includeTeam: function(team) {
    this.dispatch(NewMatchConstants.INCLUDE_TEAM, team);
  }
}