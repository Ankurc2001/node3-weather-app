const path =require('path')
const express = require('express')
const hbs= require('hbs')
const geocode = require('./utils/geocode')
const forecaste = require('./utils/forecaste')
const port = process.env.PORT || 3000

const app = express()

//Define paths for Express config
const publicdirectpath = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../template/views')
const partialspath = path.join(__dirname,'../template/partials')

//setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewpath)
hbs.registerPartials(partialspath)

//setup static directory to server
app.use(express.static(publicdirectpath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'weather',
        name:'Ankur'
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Ankur'
    })
})

app.get('/help',(rep,res)=>{
    res.render('help',{
        message:"this is app for weather",
        title:'Help',
        name:'Ankur'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
       return res.send({
            error: 'Pls provide a address...'
        })


    }
    address=req.query.address

    geocode(address,(error,{laditude, longitude, location}= {})=>{
        if(error){
            return res.send({
            error: error
            })
        }
        forecaste(laditude,longitude,(error,forecastedata)=>{
            if(error){
                return res.send({
                error: error
                })
            }
            res.send({
                address: req.query.address,
                location:location,
                forecaste : forecastedata.forecaste,
                temperature : forecastedata.temperature
            })
            
        })
    })
    
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        content:'Help article not found',
        title:'Data doesnt found',
        name:'Ankur'
    })
})


app.get('*',(req,res)=>{
    res.status('404').render('404',{
        content:'Error 404',
        title:'Error',
        name:'Ankur'
    })
})

app.listen(port,()=>{
    console.log('server is up on port '+port)
}) 