import React, { useContext, useState, } from 'react'
import { Link, useNavigate } from 'react-router-dom'
//import axios from 'axios'
import M from 'materialize-css'
import {UserContext} from '../App'

function Signin() {
  const history = useNavigate()
  const {state,dispatch} = useContext(UserContext)
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")



  const loginReq = () => {

    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      M.toast({ html: "Enter a valid Email", classes: "rounded #c62828 red light-3" })
      return
    }

    let url = "/signin"

    fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    }).catch(err => console.log(err))
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.error) {
          M.toast({ html: data.error, classes: 'rounded #ff6f00 amber darken-4' })
        } else {
          M.toast({ html: data.message, classes: 'rounded #80cbc4 teal lighten-3' });
          sessionStorage.setItem("jwt", data.token)
          sessionStorage.setItem("user", JSON.stringify(data.user))
          dispatch({ type: "USER", payload: data.user });
          history('/')
        }
      }).catch(err => {
        console.log(err)
      })
  }
  return (
    <div className='mycard'>
      <div className="card auth-card">
        <h2 className='login'>Login</h2>
        <div className='colum'>
          <input type="text" placeholder='email' value={email}
            onChange={(e) => setEmail(e.target.value)} /></div>

        <div className='colum'>
          <input type="password" placeholder='password' value={password}
            onChange={(e) => setPassword(e.target.value)} /></div>
        <div className='bten'>
          <button className="btn waves-effect waves-light"
            onClick={() => loginReq()}>
            LOGIN
          </button></div>
        <p>Create a new Account ?
          <Link to={'/signup'} className="links" >Signup</Link>
        </p>
      </div>
    </div>
  )
}

export default Signin