var ProfilePosts = React.createClass({
  propTypes: {
    postsHistory: React.PropTypes.array,
    userId: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      postsHistory: []
    }
  },

  render: function() {
    return (
      <ProfilePostsPost userId={this.props.userId}/>
    );
  }
});
