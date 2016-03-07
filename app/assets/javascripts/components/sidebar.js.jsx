
/* global React */
/* global ReactDOMServer */
/* global earth */
/* global WG */

var Sidebar = React.createClass({
  propTypes: {
    addPin: React.PropTypes.func //addPin: object -> unit
  },
  
  getInitialState: function () {
    return {
      weatherEntries: {},
      locationList: {},
      getLocationList: function() {
        var list = [];
        for (var k in this.locationList) {
          list.push(this.locationList[k]);
        }
        
        return list;
      },
    };
  },
  
  componentDidMount: function () {
    fixSidebarHeight();
    setStylishSidebar();
  },
  
  pushLocation: function(wdata) {
    var search = function () {
        this.addWeatherEntry(wdata.name, wdata);
    }.bind(this)
    
    var remove = function () {
        this.state.weatherEntries[wdata.name].marker.closePopup()
        this.state.weatherEntries[wdata.name].marker.removeFrom(earth)
        this.state.locationList[wdata.name] = undefined
        
        this.setState(this.state)
    }.bind(this)
    
    var data = wdata.cur;
    var element = (
      <LocationListEntry  key={data.id + '-item'}  
                          cityName={data.name}
                          icon={data.weather[0].icon}
                          temperature={data.main.temp}
                          description={data.weather[0].description}
                          forecasts={wdata.fcast}
                          time={data.timezone} 
                          search={search}
                          remove={remove} />
    );
    
    this.state.locationList[data.name] = element;
    this.setState(this.state);
  },
  
  getWeatherMarker: function(data) {
    var element = (
      <WeatherMarker  key={data.id + '-marker'}
                      cityName={data.name}
                      icon={data.weather[0].icon}
                      description={data.weather[0].description}
                      temperature={data.main.temp}
                      humidity={data.main.humidity}
                      windspeed={data.wind.speed}
                      time={data.timezone} />
    );
    
    return ReactDOMServer.renderToString(element);
  },
  
  addWeatherEntry: function(key, wdata) {
    var data = wdata.cur;
    if(key && data) {
      this.pushLocation(wdata);
      if(WG && earth) {
        if(!this.state.weatherEntries[key]) {
          this.state.weatherEntries[key] = {};
          this.state.weatherEntries[key].marker = WG.marker([data.coord['lat'], data.coord['lon']], {maxWidth: 240});
          this.state.weatherEntries[key].marker.addTo(earth);
        }

        this.state.weatherEntries[key].marker.bindPopup(this.getWeatherMarker(data), {maxWidth: 230});
        this.state.weatherEntries[key].marker.openPopup();
        earth.panTo([data.coord['lat'], data.coord['lon']]);
      }
      
      this.state.weatherEntries[key].data = wdata;
    }
      
    this.setState(this.state);
  },
  
  render: function() {
    return (
      <div id="sidebar">
        <Searchbox weatherList={this.state.weatherList} onSearch={this.addWeatherEntry}/>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-10 col-xs-offset-1">
              <div id="location-list"  className="panel list-group">
                {this.state.getLocationList()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});


function fixSidebarHeight() {
  // resize the sidebar height to fill browser window dynamically
  var sidebar = document.getElementById('sidebar');
  
  window.addEventListener('resize', resizesb, false);
  
  function resizesb() {
    sidebar.style.height = window.innerHeight + "px";
  }
  resizesb();
}

function setStylishSidebar() {
  //Facebook style scrollbar
    $("#sidebar").mCustomScrollbar({
        theme: 'minimal-dark',
        axis: 'y',
        scrollInertia: 0
    });
    
    $(".mCSB_dragger_bar").width(3).css({left: '5px'});
}