var ProfileConstants = {
  PROFILE_FRESHEN: "PROFILE_FRESHEN"
}

var ProfileStore = Fluxxor.createStore({
  initialize: function() {
    if(typeof(gon) == 'undefined' || typeof(gon.user) == 'undefined') {
      this.user = {};
      this.user.fresh = false;
      this.user.name = '';
    }
    this.bindActions(
      ProfileConstants.PROFILE_FRESHEN, this.onProfileFreshen
    );
  },

  onProfileFreshen: function(data) {
    this.user = data;
    this.user.fresh = true;
    this.emit("change");
  },

  getState: function() {
    return this.user;
  }
});

var ProfileActions = {
  profileFreshen: function(data) {
    this.dispatch(ProfileConstants.PROFILE_FRESHEN, data);
  }
}
