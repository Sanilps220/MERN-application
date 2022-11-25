import React ,{useContext}from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {UserContext} from '../App'

function Navbar() {
  const history =  useNavigate()
  const {state,dispatch} = useContext(UserContext)
  console.log(state);
  const logoutUser=() =>{ 
    sessionStorage.clear();
    dispatch({ type: "CLEAR" });
    history('/')
  }
  const renderList= () =>{

    if(state){
      return[    
        <li><Link to="/profile" >Profile</Link></li>,
        <li><Link to="/post" >Create post</Link></li>   ,
        <li className='btn-out'
        onClick={() => logoutUser()}>Logout</li>   

       ]
    }else{
      return[
         <li><Link to="/signin" >Login</Link></li>
      ]
    }
  }
  return ( 
  <nav>
    <div className="nav-wrapper">
      <a href="#" className="brand-logo">MERN</a>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="/" >Home</Link></li>
          {renderList()}            
      </ul>
    </div>
  </nav>
  )
}

export default Navbar
