//Request is designed to be the simplest way possible to make http calls. It supports HTTPS and follows redirects by default.
const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidmluaXRzYW5nYW5pIiwiYSI6ImNqemo2bXAxdzAxaWIzZHJ3ZW9iczFkdHYifQ.eIn1dUAXAbdZZyVjHsLWhg&limit=1'
    request({url, json:true},(error,{body}) => {
        if(error){
                callback ('Unable to connect to mapbox service!',undefined)
            } else if(body.features.length < 1) {
                callback ('Unable to find location.',undefined)
            } else {
                callback (undefined, {
                    lattitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                })
            }
        })
}

module.exports = geocode
