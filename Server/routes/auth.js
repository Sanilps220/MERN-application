const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../keys');
const requireLogin = require('../middelware/requireLogin')

router.get('/', (req, res) => {
    res.send('hello')
})

router.post('/signup', (req, res) => {
    console.log(req.body.name);
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        return res.status(422).send({ error: 'please add all the fields' })
    }
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                console.log(savedUser);
                return res.status(422).send({ error: "user allready exists with that email" })
            }
            bcrypt.hash(password, 8)
                .then(hash => {
                    const user = new User({
                        email,
                        name,
                        password:hash
                    })
                    user.save()
                        .then(user => {
                            res.json({ message: "saved successfully" })
                        })
                        .catch(err => {
                            console.log(err);
                        })
                });
        })
        .catch(err => console.log(err))
})

router.post('/signin',(req,res)=>{
    const { email, password} = req.body
    if(!email || !password){
        res.status(422).json({error:'Please add email or password !'})
    }
    User.findOne({email:email})
    
    .then(result =>{
        if(!result){
           return res.status(422).json({error:"Invalid Email or Password"})
        }
        bcrypt.compare(password,result.password)
        .then(pass=>{
            if(pass){               
               const token = jwt.sign({_id:result._id},JWT_SECRET)
                const { _id,name ,email} = result
               res.json({token,user:{_id,name,email},message:"Signedin success"});
            }else{
                return res.status(422).json({error:"Invalid Email or Password"})
            }
        })
    })
    .catch(err=>{
        console.log(err);
    })
})

router.get('/protected',requireLogin,(req,res)=>{
    res.send("loged")
})
module.exports = router;

