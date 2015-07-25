var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var MatchesInner = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("MatchesStore")],

  render: function() {
    return
  }
});

var Matches = React.createClass({
  render: function() {
    return (
      <div>
        <MatchesInner flux={flux} />
      </div>
    )
  }
})
