var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var NewMatchInner = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("NewMatchStore")],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return flux.store("NewMatchStore").getState();
  },

  addT1Player: function(id, e) {
    console.log(id);
    var t = 't1';
    var player = e.target.textContent;
    var data = {t: t, id: id, player: player};
    this.getFlux().actions.includePlayer(data);
  },

  addT1Team: function(id, e) {
    var t = 't1';
    var team = e.target.textContent;
    var data = {t: t, id: id, team: team};
    this.getFlux().actions.includeTeam(data);
  },

  addT2Player: function(id, e) {
    var t = 't2';
    var player = e.target.textContent;
    var data = {t: t, id: id, player: player};
    this.getFlux().actions.includePlayer(data);
  },

  addT2Team: function(id, e) {
    var t = 't2';
    var team = e.target.textContent;
    var data = {t: t, id: id, team: team};
    this.getFlux().actions.includeTeam(data);
  },

  removeT1Player: function(id, e) {
    var t = 't1';
    var data = {t: t, id: id};
    this.getFlux().actions.removePlayer(data);
  },

  removeT1Team: function(e) {
    var t = 't1';
    var data = {t: t};
    this.getFlux().actions.removeTeam(data);
  },

  removeT2Player: function(id, e) {
    var t = 't2';
    var data = {t: t, id: id};
    this.getFlux().actions.removePlayer(data);
  },

  removeT2Team: function(e) {
    var t = 't2';
    var data = {t: t};
    this.getFlux().actions.removeTeam(data);
  },

  render: function(){
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
                  <Filter items={this.state.players} itemTitleName="email" placeholder="Add Players" itemClickFunction={this.addT1Player} selectedItems={this.state.t1Players} selectedClickFunction={this.removeT1Player}/>
                </div>

                <div id="t1Teams" className="tab-pane">
                  <Filter items={this.state.teams} itemTitleName="name" placeholder="Add Team" itemClickFunction={this.addT1Team} selectedItems={this.state.t1Team} selectedClickFunction={this.removeT1Team} />
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
                  <Filter items={this.state.players} itemTitleName="email" placeholder="Add Players" itemClickFunction={this.addT2Player} selectedItems={this.state.t2Players} selectedClickFunction={this.removeT2Player} />
                </div>

                <div id="t2Teams" className="tab-pane">
                  <Filter items={this.state.teams} itemTitleName="name" placeholder="Add Team" itemClickFunction={this.addT2Team} selectedItems={this.state.t2Team} selectedClickFunction={this.removeT2Team} />
                </div>

              </div>
            </div>
          </section>
        </div>

        <div className="col-md-8">
          <NewMatchDetail t1Players={this.state.t1Players} t1Team={this.state.t1Team} t2Players={this.state.t2Players} t2Team={this.state.t2Team} />
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