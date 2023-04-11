const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../../model/user');
const jwt = require('jsonwebtoken')


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
});


router.post('/login',(req,res,next)=>{
    User.find({username:req.body.username})
    .exec()
    .then(user => {
        if(user.length < 1 ){
            return res.status(401).json({
                msg:"user not found"
            })
        }
        bcrypt.compare(req.body.password,user[0].password,(error,result)=>{
            if(!result){
                return res.status(401).json({
                    msg:"Password does not match"
                })
            }
            if(result){
                const token = jwt.sign({
                    username:user[0].username,
                    email:user[0].email
                },
                'dummy text ',
                {
                    expiresIn:"24h"
                }
                ) ;
                res.status(200).json({
                    username:user[0].username,
                    email:user[0].user,
                    tok:token
                })
                .catch(error =>{
                    console.log(error);
                    res.status(500).json({
                        error : error
                    })
                })
               
            }
        });

        
    })
})



module.exports = router;