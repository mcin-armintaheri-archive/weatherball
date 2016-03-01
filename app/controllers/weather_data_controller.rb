class WeatherDataController < ApplicationController
  def initialize
    @url = 'http://api.openweathermap.org/data/2.5/'
    @appkey = 'appid=14e9f7b0d67d44ce6f16873e84ee3c66'
  end
  
  def city
    name = params[:name]
    api q: name
  end
  
  def coords
    lat, lon = params[:lat], params[:lon]
    api lat: lat, lon: lon
  end
  
  def cityid
    cityid = params[:cityid]
    api id: cityid
  end
    
  private
    def api(paramaters)
      paramlist = paramaters.map {|k,v| k.to_s + "=" + v.to_s + '&'}
      fc = forecast paramlist.join('')
      cu = current paramlist.join('')
      render json: {name: cu["name"], cur: cu, fcast: fc}
    end
    
    def forecast(paramaters)
      url = @url + 'forecast?' + paramaters + "mode=json&units=metric&" + @appkey
      res = JSON.parse(RestClient.get url)
      flist = []
      res["list"].each do |f|
        if not flist.map{|e| e["dt_txt"].split(' ')[0]}.include?(f["dt_txt"].split(' ').at(0)) then
          flist = flist << f
        end
      end
      flist[0..2]
    end
      
    
    def current(paramaters)
      url = @url + 'weather?' + paramaters + "mode=json&units=metric&" + @appkey
      JSON.parse(RestClient.get url)
    end
end
