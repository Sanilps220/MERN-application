const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")

const requireLogin = require('../middelware/requireLogin')

router.get('/profile',requireLogin,(req,res)=>{
    console.log(req.user);
    res.send("profile")
})

module.exports = router;