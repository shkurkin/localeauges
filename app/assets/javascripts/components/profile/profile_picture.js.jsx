var ProfilePicture = React.createClass({
  propTypes: {
    imageUrl: React.PropTypes.string,
    name: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      imageUrl: '',
      name: 'Jane Doe'
    }
  },

  render: function() {
    return (
      <aside className="profile-nav">
        <section className="panel">
          <div className="user-heading round">
            <a href="#">
              <img src={this.props.imageUrl} alt={this.props.name} />
            </a>
            <h1>{this.props.name}</h1>
          </div>
        </section>
      </aside>
    );
  }
})
