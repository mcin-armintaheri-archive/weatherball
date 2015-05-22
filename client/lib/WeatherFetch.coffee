
@WeatherFetch = (URL, earth) ->
  getWeatherData = (city) ->
    jQuery ($) ->
      $
        .ajax
          url: URL + city
        .done (data) ->
          markerMarkup = "<h3>" + data.name + ", " + data.sys.country + "</h3><ul>"
          datalist = ("<li>" + k + ": " + v + "</li>" for k,v of data.main)
          markerMarkup = markerMarkup + datalist.join('') + "</ul>"
          WE
            .marker [data.coord.lat, data.coord.lon]
            .addTo earth
            .bindPopup markerMarkup, {maxWidth: 200, closeButton: true}
            .openPopup()
         
  jQuery ($) ->
    $ "#city-search.hide"
      .click ->
        $ this
          .removeClass "hide"
          .addClass "expand"
          .delay 300
          .find "#search-bar"
            .removeClass "hidden"
    $ document
      .mousedown (e) ->
        if e.target is not $("#city-search.expand")
          $ "#city-search.expand"
            .removeClass "expand"
            .addClass "hide"
            .delay 300
            .find "#search-bar"
              .addClass "hidden"
    $ "#city-search.expand"
      .find "#search-bar"
        .submit ->
          getWeatherData $(this).find("input:first").val().replace(' ', '_')
          return false #prevent page refresh after submission

