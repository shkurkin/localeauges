var Widget = React.createClass({
  propTypes: {
    headColor: React.PropTypes.string,
    spanColor: React.PropTypes.string,
    containerSize: React.PropTypes.string,
    icon: React.PropTypes.string,
    title: React.PropTypes.string
  },

  render: function(){
    var headStyle = { backgroundColor: this.props.headColor };
    var spanStyle = { backgroundColor: this.props.spanColor };
    return(
      <div className={this.props.containerSize}>
        <section className="panel">
          <div className="panel-head" style={headStyle}>
            <span style={spanStyle}>
              <i className={this.props.icon}></i>
            </span>
            <h3>{this.props.title}</h3>
          </div>
          <div className="panel-body">
            {this.props.children}
          </div>
        </section>
      </div>
    );
  }
});