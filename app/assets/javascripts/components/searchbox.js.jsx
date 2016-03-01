/* global classNames */
/* global React */



var Searchbox = React.createClass({
  propTypes: {
    onSearch: React.PropTypes.func //onSearch: (key, value) -> unit
  },
  
  getInitialState: function() {
    return {
      expand: false,
      weatherList: this.props.weatherList
    };
  },
  
  fetchData: function(event, params) {
    var url = 'weather/'
    var searchbox = this;
    event.preventDefault();
    $('input').each(function(idx,el) {$(el).val('')});
    $.ajax({
      url: url + params,
      type: 'GET',
      cache: false,
      success: function(data) {
        searchbox.props.onSearch(data.name, data);
      },
      
      error: function (error) {
        alert("City not found")
      }
    });
  },
  
  handleExpand: function(event) {
    this.setState({expand: !this.state.expand});
  },
  
  handleSubmitCity: function (event) {
    if(this.state['cityname']) {
      var params = 'city/' + this.state['cityname'];
      this.fetchData(event, params)
    }
  },
  
  handleSubmitCoords: function (event) {
    if(this.state['lat'] && this.state['lon']) {
      var params = 'coords?' + "lat=" + this.state['lat'] + "&" + "lon=" + this.state['lon'];
      this.fetchData(event, params)
    }
  },
  
  handleSubmitCityID: function (event) {
    if(this.state['cityid']) {
      var params = 'cityid/' + this.state['cityid']
      this.fetchData(event, params)
    }
  },
  
  bindTo: function(stateKey) {
    var searchbox = this;
    return (function (event) {
      searchbox.state[stateKey] = event.target.value
    });
  },
  
  render: function() {
    var adv_search = classNames({
      "container-fluid": true,
      "expanded": this.state.expand,
      "retracted": !this.state.expand
    });
    
    var adv_search_icons = classNames({
      "glyphicon": true,
      "glyphicon-menu-down": !this.state.expand,
      "glyphicon-menu-up": this.state.expand
    });
    
    
    return (
      <div id="search-box" className={adv_search}>
        <div className="row">
          <div className="col-xs-12">
            <form onSubmit={this.handleSubmitCity}>
              <div id="search-bar" className="input-group thin-shadow">
                <input type="text" 
                  className="form-control" 
                  placeholder="Search for a city"
                  onChange={this.bindTo('cityname')}>
                </input>
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-info">
                    <span className="glyphicon glyphicon-search"></span>
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
        <div id="advanced-search" className="collapse">
          <div className="row">
            <div className="col-xs-12">
              <form onSubmit={this.handleSubmitCoords}>
                <div className="input-group thin-shadow">
                  <span className="input-group-addon">
                    LAT
                  </span>
                  <input type="text" className="form-control" onChange={this.bindTo('lat')}>
                  </input>
                  <span className="input-group-addon">
                    LON
                  </span>
                  <input type="text" className="form-control" onChange={this.bindTo('lon')}>
                  </input>
                  <span className="input-group-btn">
                    <button type="submit" className="btn btn-info">
                      <span className="glyphicon glyphicon-search"></span>
                    </button>
                  </span>
                </div>
              </form>
              <form onSubmit={this.handleSubmitCityID}>
                <div className="input-group thin-shadow">
                  <span className="input-group-addon">
                    OWM CITY ID
                  </span>
                  <input type="text" className="form-control" onChange={this.bindTo('cityid')}>
                  </input>
                  <span className="input-group-btn">
                    <button type="submit" className="btn btn-info">
                      <span className="glyphicon glyphicon-search"></span>
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div id="advanced-search-toggle" 
             className="row" 
             data-toggle="collapse" 
             data-target="#advanced-search"
             onClick={this.handleExpand}>
          <span style={{paddingRight: "1em"}} className={adv_search_icons}></span>
          MENU
          <span style={{paddingLeft: "1em"}} className={adv_search_icons}></span>
        </div>
      </div>
    );
  }
});