var ProfileStatusPost = React.createClass({
  render: function() {
    return (
      <aside className="profile-info">
        <section className="panel">
          <form>
            <textarea placeholder="Share some news!" rows="2" className="form-control input-lg p-text-area"></textarea>
          </form>
          <footer className="panel-footer">
            <button className="btn btn-danger pull-right">Post</button>
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
