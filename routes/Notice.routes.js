const express = require('express')

const Notice_Model = require('../model/Notice.Model')

const NoticeRouter = express.Router();

NoticeRouter.get('/',async(req,res)=>{
   try{
    res.status(200).send("Welcome to Notic Board")
   }
   catch(err){
      res.status(500).send({message:err.message})
   }
})


NoticeRouter.get('/get',async(req,res)=>{
    try{
        const user = await Notice_Model.find()
        res.status(200).send(user)
    }
    catch(err){
       res.status(500).send({message:err.message})
    }
})

NoticeRouter.post('/post',async(req,res)=>{
    try{
        const time_data = new Date()
        const time = time_data.getHours() + ":" +time_data.getMinutes() + ":" + time_data.getSeconds();
        const date = time_data.getFullYear() + "_" + (time_data.getMonth() +1) + "_" + time_data.getDate();
        const {name,notice} = req.body;
        const user = await Notice_Model.create({name,notice,date:date,time:time,})
        console.log(user)
        user.save()
        res.status(200).send(user)

    }
    catch(err){
       res.status(500).send({message:err.message})
    }
})

NoticeRouter.delete('/delete/:id',async(req,res)=>{
    const userId = req.params.id
    try{
        const user = await Notice_Model.findByIdAndDelete({_id:userId})
        res.status(200).send(user)
    }
    catch(err){
       res.status(500).send({message:err.message})
    }
})

NoticeRouter.patch('/edit/:id',async(req,res)=>{
    try{
         const user = await Notice_Model.findByIdAndUpdate(req.params.id,req.body)
         user.save()
         res.status(200).send(user)
    }
    catch(err){
        res.status(500).send({message:err.message})

    }
})

module.exports = NoticeRouter


