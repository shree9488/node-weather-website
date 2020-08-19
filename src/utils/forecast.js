const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=70536bf22fbcd736d760bf72f9bf08a0&query=' + lat + ',' + long + '&units=m'
    request({ url, json: true },(error, {body})=>{
        if(error){
            callback('unable to connect weather service!',undefined)
        }else if(body.error){
            callback('unable to find weather',undefined)
        }else{
            callback(undefined,'temperature out is '+ body.current.temperature+' degrees up!')
        }
    })
}

module.exports = forecast