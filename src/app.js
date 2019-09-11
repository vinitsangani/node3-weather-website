//Path is a node core module to manipulate the paths. It's a good practice to keep core modules before the npm modules.
const path = require('path')
//expreess modules just passes a function
const express = require('express')
//handelbars directoty. Handlebars are used to create dynamic templates. 
const hbs = require('hbs')
const geocode = require('./Utils/geocode')
const forecast = require('./Utils/forecast')

//Create express application
const app = express()
console.log('1- app.js main file')
//setting up port for heroku which gets stores in the environment variable.
const port = process.env.PORT || 3000

//__dirname is a object defined in wrapper function and it stores the current files directory. (__filename)
//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

console.log('2- app.js main file')

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/',(req,res) => {
console.log('3- app.js main file')
    res.render('index',{
        title: 'Weather',
        name: 'Vinit Sangani'
    })
    console.log('2- app.js main file')
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Me',
        name:'Vinit Sangani'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        message: 'Happy to Help',
        title:'Help',
        name: 'Vinit Sangani'
    })
})

// app.get('/help',(req,res)=>{
//     res.send('Help Page')
// })

app.get('/Weather',(req,res)=>{
        if(!req.query.address){
        return res.send({
            error: 'Please enter location'
            })
        }
     
        geocode(req.query.address,(error,{lattitude,longitude,location}={})=>{
            if (error) {
                return res.send({error})
            }       

            forecast(lattitude,longitude,(error,data)=>{
                if (error) {
                    return res.send({error})
                }
                res.send({forecast: data,
                          location,
                          address:req.query.address})
            })
        })
})

app.get('/help/*',(req,res)=> {
    res.render('404error',{
        title:'404',
        name:'Vinit Sangani',
        message:'Help article not found'

    })
})

app.get('*',(req,res)=>{

    console.log('1- app.js main file- page not found')
    res.render('404error',{
        title:'404',
        name:'Vinit Sangani',
        message:'Page Not Found'
    })

})

app.listen(port,()=>{
    console.log('Server is up on port' + port)
})