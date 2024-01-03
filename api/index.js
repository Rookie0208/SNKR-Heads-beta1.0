const express = require("express");
const app=express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan= require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const cors = require('cors');
const axios = require('axios');
const multer = require('multer');
const path = require("path");

app.use(cors());

dotenv.config();//to use dotenv

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true})

app.use("/images", express.static(path.join(__dirname, "public/images")));//if using this images path then dont find get request, instead go to specified path

//middleware
app.use(express.json());//parse the requests when we make post requests
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./public/images")  

    },
    filename:(req,file,cb)=>{
        cb(null, req.body.name);
    },
})

const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"), (req,res)=>{
   try{
    return res.status(200).json("file uploaded successfully")
   }catch(err){
    console.log(err);
   } 
})

app.use("/api/users",userRoute);//address to run user route//do all user things here//get users//update users...etc

app.use("/api/auth",authRoute);//for login stuff
app.use("/api/posts",postRoute);//

app.get("/",(req,res)=>{
    res.send("Welcome to homepage");
})

app.get("/users",(req,res)=>{
    res.send("Welcome to user page");
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8800;
}


app.listen(port,()=>{
    console.log("i am listening")
})