 const express = require('express')
const mongoose = require('mongoose')
const User=require('./model.js')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

//get post put delete
app.get('/api',(req, res) => {
  res.send('Hello World')
})

app.post('/register',async(req,res)=>{
 try{
  const phone=req.body.phone
  const existingUser = await User.findOne({phone})

  if(existingUser){
    return res.status(400).json({
        message:'phone number already registered',
    })

  }
  const newUser=await User.create(req.body)

 res.status(200).json({
    status:true,
    message:'Successfully registered',
    userId: newUser._id,
    name:newUser.name,
    phone:newUser.phone,
 })

 }catch(error){
    res.status(500).json({
        status:false,
        message:error.message,
    })
 }
})

mongoose.connect(
    "mongodb+srv://mharinsowmiya2306:in3VVUohbgZZ0mcP@demo.c3kh8ig.mongodb.net/?retryWrites=true&w=majority&appName=Demo"
    ).then(()=>{
        console.log('Connected to database!')
        app.listen(3000, ()=>{
            console.log('listing port 3000')
            })
        
    }).catch(()=>{
        console.log('Connection Failed')     
    })
