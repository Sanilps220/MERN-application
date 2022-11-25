import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App'
import logo from '../images/192.jpg'
import background from '../images/pic.jpg'

function Profile() {
    const history = useNavigate()
    const { state, dispatch } = useContext(UserContext)
    const [user, setUser] = useState("")
    console.log("pro", user.name);
    useEffect(() => {
        if (state) {
            return setUser(state)
        } else {
            return history('/signin')
        }

    }, [])


    return (
        <>
            <div>
                <div className='prof-div'>
                    <img src={background} alt="bbg" />
                </div>
                <div className='display'>
                    <img className='profile' src={logo} alt="prof" />
                    <h4 style={{ color: "white", fontSize: 34 }}>{user ? user.name : " "}</h4>

                </div>
            </div>
            <div className="Contact-div">
                <div className="Con-alighn">
                    <div className="header" >
                        <h5>About Me</h5>
                        <h6>Hi I am {user.name} and I'm a selfthougt web developer.</h6>
                    </div>
                    <div className="headers" >
                        <h5>Contact Me</h5>
                    </div>
                    <div className="Contact">
                        <div className="icon">
                            <i class="medium material-icons ">email</i>
                        </div>
                        <div className="cont">
                            <h6 style={{ color: "red" }} >Email</h6>
                            <h5>{user.email}</h5>
                        </div>

                    </div>
                </div>
            </div>
            <div>
            </div>
        </>
    )
}

export default Profile