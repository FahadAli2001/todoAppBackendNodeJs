const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../model/user');

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"user get api is runing"
    })
})

router.post('/signup',(req,res,next)=>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            res.status(500).json({
                err:err
            })
        }
        else{
            const user =new User({
                _id : new mongoose.Types.ObjectId,
            username : req.body.username,
            email : req.body.email,
            password : hash
            })

            user.save()
            .then(result=>{
               res.status(200).json({
                new_user : result
               })
            })
            .catch(err => {
                res.status(500).json({
                    error : err
                })
            })
            console.log("user created");
        }
    });
})



module.exports = router;