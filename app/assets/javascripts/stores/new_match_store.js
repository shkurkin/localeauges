var NewMatchConstants = {
  INCLUDE_PLAYER: "INCLUDE_PLAYER",
  INCLUDE_TEAM: "INCLUDE_TEAM",
  REMOVE_PLAYER: "REMOVE_PLAYER",
  REMOVE_TEAM: "REMOVE_TEAM",
  CHANGE_DATE: "CHANGE_DATE",
  CHANGE_TIME: "CHANGE_TIME",
  CHANGE_LOCATION: "CHANGE_LOCATION"
}

var NewMatchStore = Fluxxor.createStore({
  initialize: function() {
    if(typeof(gon) == 'undefined' || typeof(gon.newMatch) == 'undefined'){
      this.newMatch = {};
    } else {
      this.newMatch = gon.newMatch;

      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1;
      var yyyy = today.getFullYear();
      if(dd<10)
          dd='0'+dd
      if(mm<10)
          mm='0'+mm
      today = mm+'-'+dd+'-'+yyyy;
      this.newMatch.date = today;
      this.newMatch.time = '06:30 PM';
    }

    this.bindActions(
      NewMatchConstants.INCLUDE_PLAYER, this.onIncludePlayer,
      NewMatchConstants.INCLUDE_TEAM, this.onIncludeTeam,
      NewMatchConstants.REMOVE_PLAYER, this.onRemovePlayer,
      NewMatchConstants.REMOVE_TEAM, this.onRemoveTeam,
      NewMatchConstants.CHANGE_DATE, this.onChangeDate,
      NewMatchConstants.CHANGE_TIME, this.onChangeTime,
      NewMatchConstants.CHANGE_LOCATION, this.onChangeLocation
    );
  },

  onIncludePlayer: function(payload) {
    var t = payload.t;
    var id = payload.id;
    var player = payload.player;
    this.newMatch[t+'Players'].push({id: id, email: player});
    this.newMatch[t+'Team'] = [];
    this.emit("change");
  },

  onIncludeTeam: function(payload) {
    var t = payload.t;
    this.newMatch[t+'Team'] = [payload];
    this.newMatch[t+'Players'] = [];
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

  onChangeDate: function(date) {
    this.newMatch.date = date;
    this.emit("change");
  },

  onChangeTime: function(time) {
    this.newMatch.time = time;
    this.emit("change");
  },

  onChangeLocation: function(location) {
    this.newMatch.location = location;
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
  },

  changeDate: function(date) {
    this.dispatch(NewMatchConstants.CHANGE_DATE, date);
  },

  changeTime: function(time) {
    this.dispatch(NewMatchConstants.CHANGE_TIME, time);
  },

  changeLocation: function(location) {
    this.dispatch(NewMatchConstants.CHANGE_LOCATION, location);
  }
}