/* global classNames */
/* global React */



var Searchbox = React.createClass({
  getInitialState: function() {
    return {
      expand: false
      
    };
  },
  
  handleExpand: function(event) {
    this.setState({expand: !this.state.expand});
  },
  
  handleSubmitCity: function (event) {
    event.preventDefault();
    if(this.state['cityname']) {
      var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + this.state['cityname'];
      $.get(url + "&appid=14e9f7b0d67d44ce6f16873e84ee3c66", function (res) {
        console.log(res);
      })
    }
  },
  
  handleSubmitCoords: function (event) {
    event.preventDefault();
  },
  
  bindTo: function(stateKey) {
    var box = this;
    return (function (event) {
      box.state[stateKey] = event.target.value
    });
  },
  
  render: function() {
    var adv_form = classNames({
      "vanish": !this.state.expand
    });
    
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
          <div className="col-md-12">
            <form onSubmit={this.handleSubmitCity}>
              <div id="search-bar" className="input-group thin-shadow">
                <input type="text" 
                  className="form-control" 
                  placeholder="Search for a Location..."
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
        <div id="advanced-search" className={adv_form}>
          <div className="row">
            <div className="col-md-12">
              <form onSubmit={this.handleSubmitCoords}>
                <div className="input-group thin-shadow">
                  <input type="text" className="form-control">
                  </input>
                  <span className="input-group-addon">
                    LON
                  </span>
                  <input type="text" className="form-control">
                  </input>
                  <span className="input-group-addon">
                    LAT
                  </span>
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
        <div id="advanced-search-toggle" className="row" onClick={this.handleExpand}>
          <span style={{paddingRight: "1em"}} className={adv_search_icons}></span>
          MENU
          <span style={{paddingLeft: "1em"}} className={adv_search_icons}></span>
        </div>
      </div>
    );
  }
});