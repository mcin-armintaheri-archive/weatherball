/* global React */
/* global capitalize */

var WeatherMarker = React.createClass({
  propTypes: {
    cityName: React.PropTypes.string,
    time: React.PropTypes.string,
    icon: React.PropTypes.string,
    description: React.PropTypes.string,
    temperature: React.PropTypes.number,
    humidity: React.PropTypes.number,
    windspeed: React.PropTypes.number
  },
  
  
  render: function() {
    var description = this.props.description.split(' ').map(capitalize).join(' ');
    
    return (
      <div className="weather-marker container-fluid">
        <div className="row">
          <div className="col-xs-6">
            <div className="row">
              <h5>{this.props.cityName}</h5>
            </div>
            <div className="row">
              <h6>{this.props.time}</h6>
            </div>
            <div className="row">
              <h6>{description}</h6>
            </div>
          </div>
          <div className="col-xs-6">
            <br />
            <div className="row">
              <h6>Humidity: {this.props.humidity}%</h6>
            </div>
            <div className="row">
              <h6>Wind: {this.props.windspeed} km/s</h6>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-6 stat-icon-container">
            <img  src={"http://openweathermap.org/img/w/" + this.props.icon + ".png"}
                  className="stat-icon"/>
          </div>
          <div className="col-xs-6 mark-temp">
            <span>
              {Math.round(this.props.temperature)}<sup>&#x2103;</sup>
            </span>
          </div>
        </div>
      </div>
    );
  }
});
