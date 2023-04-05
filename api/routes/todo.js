const express = require('express');

const router = express.Router();

const Todo = require('../../model/todo');
const mongoose = require('mongoose');


router.get('/getTodo',(req,res,next)=>{
    Todo.find().then(result=>{
        res.status(200).json(
            {
                result
            }
        )
    }).catch(error=>{
        res.status(500).json({
            error:error
        })
    })
})


router.post('/add',(req,res,next)=>{
   const todo = Todo({
    _id : new mongoose.Types.ObjectId,
    title:req.body.title,
    description : req.body.description
   })

   todo.save().then(
    result =>{
        res.status(200).json({
            result,
            message:"user created"
        })
    }
   ).catch(err=>{
    res.status(500).json({
        error:error
    })
   })
})

router.delete('/delete/:id',(req,res,next)=>{
    console.log(req.params.id);
    Todo.deleteOne({_id:req.params.id}).then(
        result=>{
            res.status(200).json({
                message:"Deleted SuccessFully"
            })
        }
    )
})


router.put('/update/:id',(req,res,next)=>{
    Todo.findOneAndUpdate({_id:req.params.id},{
        $set:{
            title : req.body.title,
            description  : req.body.description
        }
    }).then(result=>{
        res.status(200).json({
            update_result : result
        })
    })
    .catch(error =>{
        res.status(500).json({
            error:error
        })
    })
})





module.exports = router;