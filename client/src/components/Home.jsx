import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { UserContext } from '../App'
import M from 'materialize-css'

const hexaColor = () => {
  let str = '0123456789abcdef'
  let color = ''
  for (let i = 0; i < 6; i++) {
    let index = Math.floor(Math.random() * str.length)
    color += str[index]
  }
  return '#' + color
}



function Home() {
  const { state, dispatch } = useContext(UserContext)
  const [post, setPost] = useState([]) 
  const [search, setSearch] = useState([])
   console.log("s", search);
  useEffect(() => {
    const url = "/allpost"

    fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => res.json())
      .then(data => {
        console.log("data post",data.posts)
        setPost(data.posts)
        setSearch(data.posts)
      })

  }, [])
  const deletePost = (postId) => {
    
    fetch(`/deletePost/${postId}`, {
      method:'delete',
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem('jwt')
      }
    }).then(res => res.json())
      .then(result => {
        console.log("dele resu",result.result);
        const newData = post.filter(item => {
          return item._id !== result.result._id
        })
        M.toast({ html: "Post deleted", classes: '#ff9e80 deep-orange accent-1' })
        setPost(newData)
        setSearch(newData)

      })
      .catch(err => {
        M.toast({ html: "Please wait not responding", classes: '#ff9e80 deep-orange accent-1' })
        console.log(err);
      })
  }

  const filterUser = (events) => {
    const value = 
    //"sanil"
    events.target.value.toLowerCase();
    const filteredUsers = post.filter(item => (
      item.postedBy.name.toLowerCase()
      .includes(value)
    )
       )
      console.log("result",filteredUsers);
      
      setSearch(filteredUsers)
  }
  
  return (
<div>  
  <h5 className='name-card'>Social Cards</h5>
  <div className="nav-wrapper nav-wr">
      <form>
        <div className="input-field">
          <input id="search" type="search" 
          onChange={(events)=> filterUser(events)}
          />
          <label className="label-icon" for="search">
            <i className=" material-icons">search</i></label>
          <i className="material-icons"
          onClick={(e)=>{console.log(e);}}
          >close</i>
        </div>
      </form>
    </div>
    <div className='name-align'>
      {search ? 
      search.map(item => {
          return (
            <div className="card home-com">

              <div className="card-header ued" style={{ backgroundColor: hexaColor() }}>
                <i className="small material-icons ">person_pin </i>
                <p className='user'>{item.postedBy.name}</p>

                {state && item.postedBy._id === state._id
                  &&
                  <i className="small material-icons delete" onClick={() => {
                    deletePost(item._id)
                    
                  }}>delete</i>
                }
              </div>
              <img className='imge' src="https://icons.veryicon.com/png/o/miscellaneous/8atour/new-27.png" alt="" />
              <div className="card-body text-center">            
               
                <h1 className="card-title" >{item.title}</h1> <span>about</span>
              </div>
              <div className="card-content">
                <p className='text-body'>{item.body}</p>
              </div>
            </div>
          )
        }): " load" }
      </div>
      {post ?"": "loadig"}
      </div>
       
  )

}

export default Home