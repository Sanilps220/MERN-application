const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const {JWT_SECRET} = require('../keys')
const User = mongoose.model('User')

module.exports = (req,res,next)=>{
    const {authorization} = req.headers;
    console.log(authorization)
    if(!authorization){
        return res.status(401).json({error:"you must be logged in."})
    }
    const token = authorization.replace("Bearer ","")
console.log(JSON.stringify(token));
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            console.log(err);
           return res.status(401).json({error:"you must be logged in"})
        }
        const {_id} = payload
        User.findById({_id:_id}) 
        .then(data=>{
            req.user = data
            next()
        })
        
    })

}