var Panel = React.createClass({
  propTypes: {
    header: React.PropTypes.element
  },

  render: function() {
    return (
      <section className="panel" {...this.props}>
        {this.props.header}
        <div className="panel-body">
          {this.props.children}
        </div>
      </section>
    );
  }
});
