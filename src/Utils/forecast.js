//Request is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects by default.
const request = require('request')

const forecast = (lattitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/43cdd034da4d6509b7dd4c0a0a5208cc/' + lattitude + ',' + longitude +'?units=si&exclude=minutely&exclude=hourly&exclude=daily'
    request({url,json:true},(error,{body})=> {
            if(error){
                callback('Unable to connect to weather service!',undefined)
            } else if (body.error) {
                callback('Unable to find location',undefined)
            } else {
                callback(undefined,'Current temperature is ' + body.currently.temperature + '. ' + body.currently.summary)
            }

    })
}

module.exports = forecast 