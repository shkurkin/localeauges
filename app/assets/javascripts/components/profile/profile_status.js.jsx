var ProfileStatus = React.createClass({
  propTypes: {
    statusHistory: React.PropTypes.array
  },

  getDefaultProps: function() {
    return {
      statusHistory: []
    }
  },

  render: function() {
    return (
      <ProfileStatusPost />
    );
  }
});
