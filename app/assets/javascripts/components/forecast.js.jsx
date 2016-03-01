/*global React */

var Forecast = React.createClass({
  propTypes: {
    day: React.PropTypes.string,
    icon: React.PropTypes.string,
    desc: React.PropTypes.string,
    temp: React.PropTypes.number,
    min: React.PropTypes.number,
    max: React.PropTypes.number
  },
  
  render: function() {
    var weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    return (
      <li>
        <div className="fcast-item">
          <div className="row">
            <span>{weekday[this.props.day]}</span>
          </div>
          <div className="row">
            <img  src={"http://openweathermap.org/img/w/" + this.props.icon + ".png"}
                        className="stat-icon"/>
          </div>
          <div className="row">
            <table>
              <tr>
                <td><span>T: </span></td>
                <td><span>{this.props.temp}<sup>&#x2103;</sup></span></td>
              </tr>
              <tr>
                <td><span>L: </span></td>
                <td><span>{this.props.min}<sup>&#x2103;</sup></span></td>
              </tr>
              <tr>
                <td><span>H: </span></td>
                <td><span>{this.props.max}<sup>&#x2103;</sup></span></td>
              </tr>
            </table>
          </div>
        </div>
      </li>
    );
  }
});
