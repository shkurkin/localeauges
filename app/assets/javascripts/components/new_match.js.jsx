var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var NewMatchInner = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("NewMatchStore", "DashboardMatchStore")],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    return flux.store("NewMatchStore").getState();
  },

  componentDidMount: function() {
    $('.dpYears').datepicker({autoclose: true}).on('changeDate', this.changeDate);
    $('.timepicker-default').timepicker().on('changeTime', this.changeTime);
    if(!this.state.loadedFromGon)
      this.loadGonFromDom();
  },

  componentWillUpdate: function() {
    var defaultHeight = 927;
    var margin = 40;
    var matchDetailHeight = this.refs.matchDetail.getDOMNode().clientHeight;
    var locationSelectHeight = this.refs.locationSelect.getDOMNode().clientHeight;
    if((matchDetailHeight + locationSelectHeight) > (defaultHeight - margin) )
      this.refs.rightCol.getDOMNode().style.height = matchDetailHeight + locationSelectHeight + margin + 'px';
  },

  loadGonFromDom: function() {
     var domGon = eval($('#gonWrap > script').html());
     this.getFlux().actions.newMatchLoadGonFromDom(domGon);
  },

  addT1Player: function(id, e) {
    console.log(id);
    var t = 't1';
    var email = e.target.textContent;
    var data = {t: t, id: id, email: email};
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
    var email = e.target.textContent;
    var data = {t: t, id: id, email: email};
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
    var email = e.target.parentElement.textContent;
    var data = {t: t, id: id, email: email};
    this.getFlux().actions.removePlayer(data);
  },

  removeT1Team: function(id, e) {
    var t = 't1';
    var name = e.target.parentElement.textContent;
    var data = {t: t, id: id, name: name};
    this.getFlux().actions.removeTeam(data);
  },

  removeT2Player: function(id, e) {
    var t = 't2';
    var email = e.target.parentElement.textContent;
    var data = {t: t, id: id, email: email};
    this.getFlux().actions.removePlayer(data);
  },

  removeT2Team: function(id, e) {
    var t = 't2';
    var name = e.target.parentElement.textContent;
    var data = {t: t, id: id, name: name};
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

  changeLocation: function(nickname, address, id) {
    var newLocation = {nickname: nickname, address: address, id: id};
    this.getFlux().actions.changeLocation(newLocation);
  },

  setUpMatch: function() {
    // throw error if location has not been selected
    if(this.state.location.address == 'Address')
      toastr.error("Please select a location!", 'Match creation error')
    else
      this.defineTeams(this.createMatch);
  },

  defineTeams: function(callback) {
    var data = [
      {name: this.state.t1NewName, players: this.state.t1NewPlayers, respond_as: 't1'},
      {name: this.state.t2NewName, players: this.state.t2NewPlayers, respond_as: 't2'}
    ];

    $.ajax({
      type: 'POST',
      url: '/teams/define_teams_for_match.json',
      dataType: 'json',
      contentType: 'application/json',
      data:  JSON.stringify({data: data}),
      success: function(callback, msg) {
        var t1, t2;
        for(var team in msg.teams) {
          if(!msg.teams[team].userTeam)
            toastr.success('Welcome!', msg.teams[team].name + ' created')
        }
        if (typeof msg.teams['t1'] !== 'undefined')
          t1 = msg.teams['t1'].id;
        if (typeof msg.teams['t2'] !== 'undefined')
          t2 = msg.teams['t2'].id;

        callback(t1, t2);
      }.bind(this, callback),
      error: function(requestObject, error, errorThrown) {
        toastr.error("Are you sure your team name is unique?", 'Team creation error')
        console.log('error: ' + error + ' errorThrown: ' + errorThrown);
      }
    });

  },

  createMatch: function(team1_id, team2_id) {
    if(typeof team1_id === 'undefined')
      team1_id = this.state.t1Team[0].id
    if(typeof team2_id === 'undefined')
      team2_id = this.state.t2Team[0].id
    var data = {
      team1_id: team1_id,
      team2_id: team2_id,
      datetime: this.state.date + ' ' + this.state.time,
      location_id: this.state.location.id
    };
    $.ajax({
      type: 'POST',
      url: '/matches',
      data: data,
      success: function(msg) {
        console.log(msg);
        var modal = $(msg);
        $('body').append(modal)
        modal.modal('toggle');
      },
      error: function(requestObject, error, errorThrown) {
        toastr.error("Our bad! Please try again later.", 'Match creation error')
        console.log('error: ' + error + ' errorThrown: ' + errorThrown);
      }
    });
  },

  panelHeaders: {
    t1: (
      <PanelHeader title="Team 1">
        <ul className="nav nav-tabs pull-right">
          <li className="active"><a data-toggle="tab" href="#t1Players">Players</a></li>
          <li><a data-toggle="tab" href="#t1Teams">Teams</a></li>
        </ul>
      </PanelHeader>
    ),
    t2: (
      <PanelHeader title="Team 2">
        <ul className="nav nav-tabs pull-right">
          <li className="active"><a data-toggle="tab" href="#t2Players">Players</a></li>
          <li><a data-toggle="tab" href="#t2Teams">Teams</a></li>
        </ul>
      </PanelHeader>
    ),
    date: <PanelHeader title="Date" />,
    time: <PanelHeader title="Time" />,
    location: <PanelHeader title="Location" />
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
          <Panel header={this.panelHeaders.t1}>
            <div className="tab-content">
              <div id="t1Players" className="tab-pane active">
                <Filter items={this.state.players} itemTitleName="email" placeholder="Add Players" itemClickFunction={this.addT1Player} selectedItems={this.state.t1NewPlayers} selectedClickFunction={this.removeT1Player}/>
              </div>
              <div id="t1Teams" className="tab-pane">
                <Filter items={this.state.teams} itemTitleName="name" placeholder="Add Team" itemClickFunction={this.addT1Team} selectedItems={this.state.t1Team} selectedClickFunction={this.removeT1Team} />
              </div>
            </div>
          </Panel>

          <Panel header={this.panelHeaders.t2}>
            <div className="tab-content">
              <div id="t2Players" className="tab-pane active">
                <Filter items={this.state.players} itemTitleName="email" placeholder="Add Players" itemClickFunction={this.addT2Player} selectedItems={this.state.t2NewPlayers} selectedClickFunction={this.removeT2Player}/>
              </div>
              <div id="t2Teams" className="tab-pane">
                <Filter items={this.state.teams} itemTitleName="name" placeholder="Add Team" itemClickFunction={this.addT2Team} selectedItems={this.state.t2Team} selectedClickFunction={this.removeT2Team} />
              </div>
            </div>
          </Panel>

          <Panel header={this.panelHeaders.date}>
            <div id="datePicker">
              <div data-date-viewmode="years" data-date-format="mm-dd-yyyy" data-date={this.state.date} data-date-container='#datePicker' className="input-append date dpYears">
                <input type="text" onChange={this.updateDate} creadOnly="" value={today} size="16" className="form-control" id="dateInput" />
                <span className="input-group-btn add-on">
                  <button className="btn btn-danger" type="button"><i className="fa fa-calendar"></i></button>
                </span>
              </div>
            </div>
          </Panel>

          <Panel header={this.panelHeaders.time}>
            <div className="input-group bootstrap-timepicker">
              <input type="text" onChange={this.updateTime} className="form-control timepicker-default" value={this.state.time} id="timeInput" />
              <span className="input-group-btn">
                <button className="btn btn-danger" type="button" style={{padding: "6px 10px", marginLeft: "-28px"}}><i className="fa fa-clock-o"></i></button>
              </span>
            </div>
          </Panel>
        </div>

        <div className="col-md-8" ref="rightCol" style={{height: '927px', position: 'relative'}}>
          <div ref="matchDetail">
            <NewMatchDetail t1NewPlayers={this.state.t1NewPlayers} t1Team={this.state.t1Team} t1NewName={this.state.t1NewName} t2NewPlayers={this.state.t2NewPlayers} t2Team={this.state.t2Team} t2NewName={this.state.t2NewName} date={this.state.date} time={this.state.time} location={this.state.location} />
            <div className="set-up-match">
              <button onClick={this.setUpMatch} className="btn btn-success" style={{width: '50%', fontSize: '24px', margin: '25px 0'}}>Set It Up!</button>
            </div>
          </div>
          <Panel header={this.panelHeaders.location} style={{position: 'absolute', bottom: '0', width: 'calc(100% - 30px)'}} ref="locationSelect">
            <GoogleMap locations={this.state.locations} changeLocationFunction={this.changeLocation} />
          </Panel>
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
