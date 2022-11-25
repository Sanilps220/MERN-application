import React, { useState } from 'react'
import M from 'materialize-css'

function CreatePost() {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  const postDetails =()=> {
    let url = "/createPost"  
    fetch(url,{
      method:"post",
      headers:{
        "Content-Type":"application/json" ,
        "Authorization":"Bearer "+sessionStorage.getItem("jwt")        
      },
      body:JSON.stringify({
        title:title,
        body:body
  })
}).catch(err=>console.log(err)) 
.then(res => res.json()) 
  .then(data => {
    console.log(data);
    if(data.error){
       M.toast({html: data.error , classes: 'rounded #ff6f00 amber darken-4' })
    }else{
    M.toast({html: data.message , classes: 'rounded #80cbc4 teal lighten-3'});
    setTitle("")
    setBody("")
  }
}).catch(err =>{
  console.log(err)
})
  }

  return (
    <div className='card input-fields newpost'>
      <div className="row">
        <div className="input-field col s12">
          <i className="material-icons prefix">mode_edit</i>
          <input id="icon_prefix2" 
          type="text" placeholder='title'
          value={title}
          onChange={(e)=> setTitle(e.target.value) }></input>
          </div>        
      </div>  
      <div className="row">
        <div className="input-field col s12">         
        <input id="icon_prefix1" 
        type="text" 
        placeholder='body'
        value={body}
        onChange={(e)=> setBody(e.target.value) }
        ></input>          
        </div>        
      </div>  
      <a class="waves-effect waves-light btn n-post" 
      onClick={()=> postDetails() }>Save</a>
    </div>    
  )
}

export default CreatePost