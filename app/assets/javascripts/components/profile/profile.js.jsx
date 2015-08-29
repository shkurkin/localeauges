var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var ProfileInner = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin('ProfileStore')],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return flux.store('ProfileStore').getState();
  },

  componentDidMount: function() {
    if(!this.state.fresh)
      this.profileFreshen();
  },

  profileFreshen: function() {
    var domGon = eval($('#gonWrap > script').html());
    this.getFlux().actions.profileFreshen(domGon);
  },

  render: function() {
    console.log(this.state);
    return (
      <div className="row">
        <div className="col-lg-3">
          <ProfilePicture name={this.state.name}/>
        </div>
        <div className="col-lg-9">
          <ProfilePosts postsHistory={[]} userId={this.state.id}/>
        </div>
      </div>
    );
  }
});

var Profile = React.createClass({
  render: function() {
    return (
      <div>
        <ProfileInner flux={flux} />
      </div>
    )
  }
})
