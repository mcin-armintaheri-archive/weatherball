/* global React */
/* global capitalize */



var LocationListEntry = React.createClass({
  propTypes: {
    cityName: React.PropTypes.string,
    time: React.PropTypes.string,
    icon: React.PropTypes.string,
    temperature: React.PropTypes.number,
    description: React.PropTypes.string,
    forecasts: React.PropTypes.array,
    search: React.PropTypes.func,
    remove: React.PropTypes.func
  },
  
  getInitialState: function () {
    return {
      forecastList: this.genForecastList()
    };
  },
  
  
  handleAccordion: function () {
    $('#location-list .collapse').collapse('hide');
    $('#' + this.props.cityName.split(' ').join('-') + "-item .collapse").collapse('show');
  },
  
  genForecastList: function() {
    var forecastList = [];
    
    for (var f in this.props.forecasts) {
      var fcast = this.props.forecasts[f];
      
      var date = new Date(fcast["dt_txt"])
      var day = date.getDay();
      var icon = fcast.weather[0].icon;
      var temp = Math.round(fcast.main.temp);
      var min = Math.round(fcast.main.temp_min);
      var max = Math.round(fcast.main.temp_max);
      
      var elem = (
        <Forecast key={this.props.cityName + "-" + date}
                  day={day}
                  icon={icon}
                  temp={temp}
                  min={min}
                  max={max}/>
      );
      
      forecastList.push(elem);
    }
    return forecastList;
  },
  
  render: function () {
    var description = this.props.description.split(' ').map(capitalize).join(' ');
    
    return (
      <div id={this.props.cityName.split(' ').join('-') + "-item"} 
           className="row location-entry list-group-item">
        <div  className="list-weather-header">
          <div className="row">
            <div className="col-xs-8">
              <div className="row">
                <h5>{this.props.cityName}</h5>
              </div>
              <div className="row">
                <h8>{this.props.time}</h8>
              </div>
              <div className="row">
                <h5>{description}</h5>
              </div>
              <div className="row">
                <div className="col-xs-12 entry-control">
                  <div className="row">
                    <div className="col-xs-3 panel entry-control-button"
                         onClick={this.props.remove}>
                      <span className="glyphicon glyphicon-trash"></span>
                    </div>
                    <div className="col-xs-3 panel entry-control-button"
                         onClick={this.props.search}>
                      <span className="glyphicon glyphicon-globe"></span>
                    </div>
                    <div className="col-xs-3 panel entry-control-button"
                         onClick={this.handleAccordion}>
                      <span className="glyphicon glyphicon-time"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xs-4">
              <div className="row stat-icon-container">
                <img  src={"http://openweathermap.org/img/w/" + this.props.icon + ".png"}
                      className="stat-icon"/>
              </div>
              <div className="row">
                <span className="temp">
                  {Math.round(this.props.temperature)}<sup>&#x2103;</sup>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="collapse">
            <ul className="forecast-list list-inline">
              {this.state.forecastList}
            </ul>
        </div>
      </div>
    );
  }
});