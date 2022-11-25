const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Post = mongoose.model("Post")

const requireLogin = require('../middelware/requireLogin')

router.get('/allpost',(req,res)=>{
    Post.find()
    .populate("postedBy","_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
        res.status(422)
    })
})
router.post('/createPost',requireLogin,(req,res)=>{
    console.log(req.user);
    const {title,body} = req.body
    if(!title || !body){
        return res.status(402).json({error:"Reaquire all the fields"})
    }
    req.user.password = undefined
    const post = new Post({
        title,body,postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result,message:"Saved success"})
    })
    .catch(err=>{console.log(err)})
   
})

router.delete('/deletePost/:postId',requireLogin,(req,res)=>{
    console.log("id para",req.params.postId)
    Post.findOne({_id:req.params.postId})    
    .populate("postedBy" , "_id name")    
    .exec((err,post)=>{        
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
            post.remove()
            .then(result=>{
                console.log("res",result);
                res.json({result})
            }).catch(err=>console.log(err))
        }
    })

})

module.exports = router; 