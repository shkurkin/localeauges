var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var NewMatchInner = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("NewMatchStore")],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return flux.store("NewMatchStore").getState();
  },

  componentDidMount: function() {
    $('.dpYears').datepicker({autoclose: true}).on('changeDate', this.changeDate);
    $('.timepicker-default').timepicker().on('changeTime', this.changeTime);
  },

  addT1Player: function(id, e) {
    console.log(id);
    var t = 't1';
    var player = e.target.textContent;
    var data = {t: t, id: id, player: player};
    this.getFlux().actions.includePlayer(data);
  },

  addT1Team: function(id, e) {
    $.ajax({
      url: '/teams/' + id + '.json',
      type: 'GET',
      dataType: 'json',
      success: function(data) {
        data.t = 't1'
        this.getFlux().actions.includeTeam(data);
      }.bind(this),
      error: function(requestObject, error, errorThrown) {
        console.log('error: ' + error + ' errorThrown: ' + errorThrown);
      }
    })
  },

  addT2Player: function(id, e) {
    var t = 't2';
    var player = e.target.textContent;
    var data = {t: t, id: id, player: player};
    this.getFlux().actions.includePlayer(data);
  },

  addT2Team: function(id, e) {
   $.ajax({
        url: '/teams/' + id + '.json',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
          data.t = 't2'
          this.getFlux().actions.includeTeam(data);
        }.bind(this),
        error: function(requestObject, error, errorThrown) {
          console.log('error: ' + error + ' errorThrown: ' + errorThrown);
        }
      })
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

  changeDate: function() {
    var newDate = $('#dateInput').val();
    this.getFlux().actions.changeDate(newDate);
  },

  changeTime: function() {
    var newTime = $('#timeInput').val();
    this.getFlux().actions.changeTime(newTime);
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

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if(dd<10)
        dd='0'+dd
    if(mm<10)
        mm='0'+mm
    today = mm+'-'+dd+'-'+yyyy;

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

          <section className="panel">
            <header className="panel-heading tab-bg-dark-navy-blue tab-right ">
              <span className="hidden-sm wht-color">Date</span>
            </header>
            <div className="panel-body">
              <div id="datePicker">
                <div data-date-viewmode="years" data-date-format="mm-dd-yyyy" data-date={this.state.date} data-date-container='#datePicker' className="input-append date dpYears">
                  <input type="text" onChange={this.updateDate} creadOnly="" value={today} size="16" className="form-control" id="dateInput" />
                  <span className="input-group-btn add-on">
                    <button className="btn btn-danger" type="button"><i className="fa fa-calendar"></i></button>
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="panel">
            <header className="panel-heading tab-bg-dark-navy-blue tab-right ">
              <span className="hidden-sm wht-color">Time</span>
            </header>
            <div className="panel-body">
              <div className="input-group bootstrap-timepicker">
                <input type="text" onChange={this.updateTime} className="form-control timepicker-default" value={this.state.time} id="timeInput" />
                <span className="input-group-btn">
                  <button className="btn btn-danger" type="button" style={{padding: "6px 10px", marginLeft: "-28px"}}><i className="fa fa-clock-o"></i></button>
                </span>
              </div>
            </div>
          </section>

        </div>

        <div className="col-md-8">
          <NewMatchDetail t1Players={this.state.t1Players} t1Team={this.state.t1Team} t2Players={this.state.t2Players} t2Team={this.state.t2Team} date={this.state.date} time={this.state.time} />
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