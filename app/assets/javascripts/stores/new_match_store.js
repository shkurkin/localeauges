var NewMatchConstants = {
  INCLUDE_PLAYER: "INCLUDE_PLAYER",
  INCLUDE_TEAM: "INCLUDE_TEAM",
  REMOVE_PLAYER: "REMOVE_PLAYER",
  REMOVE_TEAM: "REMOVE_TEAM"
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
      NewMatchConstants.INCLUDE_TEAM, this.onIncludeTeam,
      NewMatchConstants.REMOVE_PLAYER, this.onRemovePlayer,
      NewMatchConstants.REMOVE_TEAM, this.onRemoveTeam
    );
  },

  onIncludePlayer: function(payload) {
    var t = payload.t;
    var id = payload.id;
    var player = payload.player;
    this.newMatch[t+'Players'].push({id: id, email: player});
    this.emit("change");
  },

  onIncludeTeam: function(payload) {
    var t = payload.t;
    var id = payload.id;
    var team = payload.team;
    this.newMatch[t+'Team'].push({id: id, name: team});
    this.emit("change");
  },

  onRemovePlayer: function(payload) {
    var t = payload.t;
    var id = payload.id;
    var filtered = this.newMatch[t+'Players'].filter(function(player){
      if(player.id != id)
        return player;
    });
    this.newMatch[t+'Players'] = filtered;
    this.emit("change");
  },

  onRemoveTeam: function(payload) {
    var t = payload.t;
    this.newMatch[t+'Team'] = [];
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
  },

  removePlayer: function(player) {
    this.dispatch(NewMatchConstants.REMOVE_PLAYER, player);
  },

  removeTeam: function(team) {
    this.dispatch(NewMatchConstants.REMOVE_TEAM, team);
  }
}