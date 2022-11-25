import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
//import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Signin from './components/Signin';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Profile from './components/Profile';
import CreatePost from './components/CreatePost';
import { reducer, initialState } from './reducers/userReducer'

export const UserContext = createContext()

function Routing() {
  const history = useNavigate()
  const {state , dispatch} = useContext(UserContext)
  useEffect(() => {    
    const user = JSON.parse(sessionStorage.getItem("user"))
    if (user) {
      dispatch( { type:"USER",payload:user})
      history('/')
    }
    // else
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/post" element={<CreatePost />} />
    </Routes>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ state, dispatch }} >
      <Router>
        <Navbar />
        <Routing />

      </Router>
    </UserContext.Provider>
  );
}

export default App;
