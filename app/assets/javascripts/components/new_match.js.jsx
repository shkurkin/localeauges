var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var NewMatchInner = React.createClass({
  mixins: [FluxMixin],

  itemLoadFunction: function(filter){
    console.log(filter);
  },

  itemClickFunction: function(e){
    console.log(e.target.textContent);
  },

  render: function(){
    var items = [
      {title: "foo"},
      {title: "bar"},
      {title: "baz"},
      {title: "bat"},
      {title: "qux"}
    ];
    var t1Tabs = [
      {'title': 'Players', 'id': 't1Players'},
      {'title': 'Teams', 'id': 't1Teams'}
    ];

    var t2Tabs = [
      {'title': 'Players', 'id': 't2Players'},
      {'title': 'Teams', 'id': 't2Teams'}
    ];

    return(
      <div className="row">
        <div className="col-md-4">
          <section className="panel">
            <header className="panel-heading tab-bg-dark-navy-blue tab-right ">
              <ul className="nav nav-tabs pull-right">
                <li className="active"><a data-toggle="tab" href="#t1Players">Players</a></li>
                <li><a data-toggle="tab" href="#t1Teams">Teams</a></li>
              </ul>
              <span className="hidden-sm wht-color">Team 1</span>
            </header>
            <div className="panel-body">
              <div className="tab-content">

                <div id="t1Players" className="tab-pane active">
                  <Filter items={items} itemTitleName="title" placeholder="Add Players"  itemLoadFunction={this.itemLoadFunction} itemClickFunction={this.itemClickFunction} />
                </div>

                <div id="t1Teams" className="tab-pane">
                  <Filter items={items} itemTitleName="title" placeholder="Add Team" itemLoadFunction={this.itemLoadFunction} itemClickFunction={this.itemClickFunction} />
                </div>
              </div>
            </div>
          </section>

          <section className="panel">
            <header className="panel-heading tab-bg-dark-navy-blue tab-right ">
              <ul className="nav nav-tabs pull-right">
                <li className="active"><a data-toggle="tab" href="#t2Players">Players</a></li>
                <li><a data-toggle="tab" href="#t2Teams">Teams</a></li>
              </ul>
              <span className="hidden-sm wht-color">Team 2</span>
            </header>
            <div className="panel-body">
              <div className="tab-content">

                <div id="t2Players" className="tab-pane active">
                  <Filter items={items} itemTitleName="title" placeholder="Add Players"  itemLoadFunction={this.itemLoadFunction} itemClickFunction={this.itemClickFunction} />
                </div>

                <div id="t2Teams" className="tab-pane">
                  <Filter items={items} itemTitleName="title" placeholder="Add Team" itemLoadFunction={this.itemLoadFunction} itemClickFunction={this.itemClickFunction} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
});


var NewMatch = React.createClass({
  render: function() {
    return (
      <Widget containerSize="col-md-12" headColor="#ff6c60" spanColor="#e56155" title="Set up a New Match" icon="fa fa-futbol-o">
        <NewMatchInner flux={flux}/>
      </Widget>
    )
  }
});