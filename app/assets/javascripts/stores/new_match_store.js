var NewMatchConstants = {
  INCLUDE_PLAYER: "INCLUDE_PLAYER",
  INCLUDE_TEAM: "INCLUDE_TEAM",
  REMOVE_PLAYER: "REMOVE_PLAYER",
  REMOVE_TEAM: "REMOVE_TEAM",
  CHANGE_DATE: "CHANGE_DATE",
  CHANGE_TIME: "CHANGE_TIME",
  CHANGE_LOCATION: "CHANGE_LOCATION",
  NEW_MATCH_FRESHEN: "NEW_MATCH_FRESHEN"
}

var NewMatchStore = Fluxxor.createStore({
  initialize: function() {
    if(typeof(gon) == 'undefined' || typeof(gon.newMatch) == 'undefined'){
      this.newMatch = {};
      this.newMatch.fresh = false;
      this.newMatch.players = [];
      this.newMatch.teams = [];
      this.newMatch.locations = [];
      this.newMatch.location = {nickname: 'Location', address: 'Address'};
      this.newMatch.t1NewName = 'Team 1';
      this.newMatch.t1NewPlayers = [];
      this.newMatch.t1Team = [];
      this.newMatch.t2NewName = 'Team 2';
      this.newMatch.t2NewPlayers = [];
      this.newMatch.t2Team = [];
    }
    this.bindActions(
      NewMatchConstants.INCLUDE_PLAYER, this.onIncludePlayer,
      NewMatchConstants.INCLUDE_TEAM, this.onIncludeTeam,
      NewMatchConstants.REMOVE_PLAYER, this.onRemovePlayer,
      NewMatchConstants.REMOVE_TEAM, this.onRemoveTeam,
      NewMatchConstants.CHANGE_DATE, this.onChangeDate,
      NewMatchConstants.CHANGE_TIME, this.onChangeTime,
      NewMatchConstants.CHANGE_LOCATION, this.onChangeLocation,
      NewMatchConstants.NEW_MATCH_FRESHEN, this.onNewMatchFreshen
    );
  },

  onNewMatchFreshen: function(data) {
    this.newMatch = data;
    this.newMatch.fresh = true;
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
    this.emit("change");
  },

  onIncludePlayer: function(payload) {
    var t = payload.t;
    var id = payload.id;
    var name = payload.name;
    this.newMatch[t+'NewPlayers'].push({id: id, name: name});
    if(this.newMatch[t+'NewPlayers'].length == 2)
      this._getTeamName(t);
    // repopulate teams before clear
    this.newMatch.teams.unshift.apply(this.newMatch.teams, this.newMatch[t+'Team'])
    this.newMatch[t+'Team'] = [];
    var filteredPlayers = this.newMatch.players.filter(function(player){
      if(player.id != id)
        return player;
    });
    this.newMatch.players = filteredPlayers;
    this.emit("change");
  },

  _getTeamName: function(t) {
    $.ajax({
      url: '/teams/generate_name.json',
      type: 'GET',
      dataType: 'json',
      success: function(t, data) {
        this.newMatch[t+'NewName'] = data.name;
        toastr.info('We made you a team name!<br>Click it to customize.', data.name + '!')
        this.emit("change");
      }.bind(this, t),
      error: function(requestObject, error, errorThrown) {
        console.log('error: ' + error + ' errorThrown: ' + errorThrown);
      }
    })
  },

  onIncludeTeam: function(payload) {
    var t = payload.t;
    var id = payload.id;
    if(this.newMatch[t+'Team'].length != 0)
      this.newMatch.teams = this.newMatch[t+'Team'].concat(this.newMatch.teams);
    this.newMatch[t+'Team'] = [payload];
    if(t == 't1')
      this.newMatch[t+'NewName'] = 'Team 1';
    else
      this.newMatch[t+'NewName'] = 'Team 2';
    // repopulate players before clear
    this.newMatch.players.unshift.apply(this.newMatch.players, this.newMatch[t+'NewPlayers'])
    this.newMatch[t+'NewPlayers'] = [];
    var filteredTeams = this.newMatch.teams.filter(function(team){
      if(team.id != id)
        return team;
    });
    this.newMatch.teams = filteredTeams;
    this.emit("change");
  },

  onRemovePlayer: function(payload) {
    var t = payload.t;
    var id = payload.id;
    var name = payload.name;
    var filteredNewTeamPlayers = this.newMatch[t+'NewPlayers'].filter(function(player){
      if(player.id != id)
        return player;
    });
    this.newMatch.players.unshift({id: id, name: name});
    this.newMatch[t+'NewPlayers'] = filteredNewTeamPlayers;
    this.emit("change");
  },

  onRemoveTeam: function(payload) {
    var t = payload.t;
    var id = payload.id;
    var name = payload.name;
    this.newMatch.teams.unshift({id: id, name: name});
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
  },

  newMatchFreshen: function(data) {
    this.dispatch(NewMatchConstants.NEW_MATCH_FRESHEN, data);
  }
}
