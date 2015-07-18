var PanelHeader = React.createClass({
  propTypes: {
    title: React.PropTypes.string
  },

  render: function() {
    return (
      <header className="panel-heading tab-bg-dark-navy-blue tab-right">
        {this.props.children}
        <span className="wht-color">{this.props.title}</span>
      </header>
    );
  }
});
