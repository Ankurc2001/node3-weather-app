const request =require('request')

const forecaste = (laditude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=d7027facdd9f23e950f396325dc3fbd7&query='+laditude+','+longitude+'&units=m'
       request({url,json:true},(error,{body})=>{
           if(error){
               callback('unable to connec to weather sever..')
           } else if(body.error){
               callback('Unable to find location try other location..')
           }else{
               callback(undefined,{
                   forecaste: body.current.weather_descriptions[0],
                   temptarture: body.current.temperature
                 })
            }
       
        })
    
    
        
}

module.exports=forecaste
