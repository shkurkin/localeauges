var Filter = React.createClass({
  propTypes: {
    items: React.PropTypes.array,
    itemTitleName: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    containerSize: React.PropTypes.string,
    itemLoadFunction: React.PropTypes.function,
    itemClickFunction: React.PropTypes.function
  },

  getInitialState: function() {
    return {filter: ""};
  },

  updateFilter: function(e) {
    this.props.itemLoadFunction(e.target.value);
    this.setState({filter: e.target.value});
  },

  render: function() {

    var items = this.props.items.map(function(item){
      var title = item[this.props.itemTitleName].toLowerCase();
      if(this.state.filter == "") {
        return (<li onClick={this.props.itemClickFunction} >{title}</li>)
      } else {
        if(title.indexOf(this.state.filter.toLowerCase()) != -1)
          return (<li onClick={this.props.itemClickFunction}>{title}</li>)
        else
          return (<li onClick={this.props.itemClickFunction} style={{display: 'none'}}>{title}</li>);
      }
    }.bind(this));

    return (
      <div className={this.props.containerSize + " select"}>
        <input className="form-control search-input" autocomplete="off" placeholder={this.props.placeholder} onChange={this.updateFilter} />
        <ul className="select-list">
          {items}
        </ul>
      </div>
    )
  }
})