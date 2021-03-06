var Filter = React.createClass({
  propTypes: {
    items: React.PropTypes.array,
    itemTitleName: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    containerSize: React.PropTypes.string,
    itemClickFunction: React.PropTypes.func,
    selectedItems: React.PropTypes.array,
    selectedClickFunction: React.PropTypes.func
  },

  getInitialState: function() {
    return {filter: ""};
  },

  updateFilter: function(e) {
    this.setState({filter: e.target.value});
  },

  render: function() {
    var selectedItems = this.props.selectedItems.map(function(selected){
      var title = selected[this.props.itemTitleName];
      var selectedFunc = this.props.selectedClickFunction.bind(null, selected.id);
      return (<li key={selected.id} className="selected-item">{title}<i onClick={selectedFunc ? selectedFunc : null} className="fa fa-times remove-selected-item"></i></li>);
    }.bind(this));

    var items = this.props.items.map(function(item){
      var title = item[this.props.itemTitleName];
      var clickFunc = this.props.itemClickFunction.bind(null, item.id);
      if(this.state.filter == "") {
        return (<li key={item.id} onClick={clickFunc} >{title}</li>)
      } else {
        if(title.toLowerCase().indexOf(this.state.filter.toLowerCase()) != -1)
          return (<li key={item.id} onClick={clickFunc}>{title}</li>)
        else
          return (<li key={item.id} onClick={clickFunc} style={{display: 'none'}}>{title}</li>);
      }
    }.bind(this));

    return (
      <div className={this.props.containerSize + " select"}>
        <input className="form-control search-input" autoComplete="off" placeholder={this.props.placeholder} onChange={this.updateFilter} />
        <ul className="select-list">
          {selectedItems}
          {items}
        </ul>
      </div>
    )
  }
})
