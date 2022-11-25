import React, { useState } from 'react'
import { Link ,  useNavigate} from 'react-router-dom'
import M from 'materialize-css'

function Signup() {
  const history =  useNavigate()
  const [name, setName] = useState()
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const postData =()=> {
     if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({html:"invalid Email" ,classes:"rounded #c62828 red light-3"})
      return 
    }
    if(email.length > 4){
      M.toast({html: "password min 4 character required",classes:"rounded #c62828 red light-3"})
      return 
    }
    let url= "/signup"
 
    fetch(url,{
      method:"post",
      headers:{
        "Content-Type":"application/json"        
      },
      body:JSON.stringify({
        name:name,
        password:password,
        email:email
      })
    }).then(res=> res.json())
    .then(data=>{ 
      console.log(data)
      if(data.error){
        M.toast({html: data.error , classes: 'rounded #c62828 red light-3'});
       
      }else{
     M.toast({html: data.message , classes: 'rounded #80cbc4 teal lighten-3'});
     history('/signin')
  }
})
  
  }
  return (
    <div className='mycard'>
      <div className="card auth-card">
        <h2 className='login'> Signup </h2>
        <div className='colum'>
          <input type="text" placeholder='name'
            value={name}
            onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='colum'>
          <input type="text" placeholder='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='colum'>
          <input type="password" placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='bten'>
          <button className="btn waves-effect waves-light"
          onClick={()=> postData()}>
            SIGN UP
          </button></div>

        <p>Already have an Account ?
          <Link to={'/signin'} className="links"          
          >Login</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup