var ProfilePostsPost = React.createClass({
  propTypes: {
    userId: React.PropTypes.number
  },

  addPost: function() {
    var content = this.refs.postContent.getDOMNode().value;
    var userId = this.props.userId;
    var data = {
      content: content,
      user_id: userId
    };
    $.ajax({
      url: '/posts',
      type: 'POST',
      data: data,
      dataType: 'json',
      success: function(data) {
        debugger
      }.bind(this),
      error: function(requestObject, error, errorThrown) {
        console.log('error: ' + error + ' errorThrown: ' + errorThrown);
      }
    })
  },

  render: function() {
    return (
      <aside className="profile-info">
        <section className="panel">
          <form>
            <textarea ref="postContent" placeholder="Share some news!" rows="2" className="form-control input-lg p-text-area"></textarea>
          </form>
          <footer className="panel-footer">
            <button className="btn btn-danger pull-right" onClick={this.addPost}>Post</button>
            <ul className="nav nav-pills">
              <li>
                <a href="#"><i className="fa fa-camera"></i></a>
              </li>
            </ul>
          </footer>
        </section>
      </aside>
    );
  }
});
