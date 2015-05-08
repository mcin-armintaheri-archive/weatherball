
@WeatherFetch = (URI, earth) ->
  getWeatherData = (city) ->
    jQuery ($) ->
      $.ajax
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + city
       .done (data) ->
          document.write data
        
  jQuery ($) ->
    $ "#city-search.hide"
      .click ->
        this
          .removeClass "hide"
          .addClass "expand"
          .delay 300
          .find "#search-bar"
            .removeClass "hidden"
    $ "#city-search.expand"
      .find "#search-bar"
        .submit =>
          getWeatherData this.find("input:first").val()
          return false

