var NewMatchConstants = {
  EDIT_TEAMS: "EDIT_TEAMS",
  CHANGE_DATE_TIME: "CHANGE_DATE_TIME",
  CHANGE_LOCATION: "CHANGE_LOCATION"
}

var NewMatchStore = Fluxxor.createStore({
  initialize: function() {
    if(typeof(gon) == 'undefined' || typeof(gon.matchData) == 'undefined')
      this.matchData = {};
    else
      this.matchData = gon.matchData;

    this.bindActions(
      NewMatchConstants.EDIT_TEAMS, this.editTeams,
      NewMatchConstants.CHANGE_DATE_TIME, this.changeDateTime,
      NewMatchConstants.CHANGE_LOCATION, this.changeLocation
    );
  },

  editTeams: function(payload) {

  },

  changeDateTime: function(payload) {

  },

  changeLocation: function(payload) {

  }
})