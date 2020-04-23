const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const msg1 =  document.querySelector('#msg-1')
const msg2 = document.querySelector('#msg-2')
const msg3 = document.querySelector('#msg-3')
  weatherform.addEventListener('submit',(e)=>{
      e.preventDefault()
        const location = search.value
        
    fetch('/weather?address='+ location).then((response)=>{
        response.json().then((data)=>{
        
            if(data.error){
            msg1.textContent=  data.error
            msg2.textContent =''
            }
            else{
            msg1.textContent= data.location
            msg2.textContent= data.forecaste
            msg3.textContent= data.temperature
            console.log(data.temperature)
            
            

            }
        })
    })
  })