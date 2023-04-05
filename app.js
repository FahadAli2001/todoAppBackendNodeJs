const express = require("express");
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://fahad:fahad2001@cluster0.tdihxdn.mongodb.net/?retryWrites=true&w=majority');

const studentRoute = require("./api/routes/student")
const todoroute = require('./api/routes/todo');
const userRoute = require('./api/routes/user');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/student',studentRoute);
app.use('/todo',todoroute);
app.use('/user',userRoute);

mongoose.connection.on('error',err=>{
    console.log('error');
})

mongoose.connection.on('connected',connected=>{
    console.log('connected ');
})


app.use((req,res)=>{
    res.status(404).json({
        error:"Url Not Found"
    })
})

// app.use((req,res,next)=>{
//   res.status(200).json({
//     message : "app is running"
//   });
// });

module.exports  = app ;
// youtube link
// https://www.youtube.com/watch?v=BLPQU4j650I&list=PLgWjD_CBfh0ACkCyg5Kjk0mh2Mcc-sZa3&index=10