const express = require('express');
const Student = require('../../model/student')
const router = express.Router();
const mongoose = require('mongoose');

router.get('/allstudent',(req,res,next)=>{
  Student.find().then(result=>{
    res.status(200).json({
        result
    })
  })

  .catch(err =>{
    console.log("error");
    res.status(500).json({
        err
        
    })
  })
})


router.post('/addstudent',(req,res,next)=>{
    const student = new Student({
        _id : new  mongoose.Types.ObjectId,
        name  : req.body.name,
        age  : req.body.age,
        gender : req.body.gender,
        number : req.body.number
    });

    student.save().then(result=>{
        console.log(result);
        res.status(200).json({
            newStudent:result,
            
        })
    }).catch (err =>{
        console.log('error' , err);
        res.status(500).json({
            err:"err"
        })
    })
})

router.get('/:id', (req, res, next) => {
    console.log(req.params.id);
    Student.findById(req.params.id)
      .then(student => {
        res.status(200).json({
          student: student
        })
      })
      .catch(err => {
        console.log("error", err);
        res.status(500).json({
          error: err
        })
      })
  })

router.delete('/deletestudent/:id',(req,res,next)=>{
    console.log(req.params.id);
    Student.deleteOne({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            message:"User Deleted Successfuly"
        })
    })
    .catch (error =>{
        console.log(error);
        res.status(500).json({
            error : error
        })
    })
})


router.put('/update/:id',(req,res,next)=>{
    Student.findOneAndUpdate({_id:req.params.id},{
        $set:{
            name  : req.body.name,
            age  : req.body.age,
            gender : req.body.gender,
            number : req.body.number
        }
    })
    .then(result=>{
        res.status(200).json({
            update_result : result
        })
    })

    .catch(error => {
        res.status(500).json({
            error_message : error
        })
    })
})

module.exports = router;