//essential imports

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


//running the app

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


//other required stuff like routes,model,etc    



const Contact = require("./routes/contact");


//route to /api/contact
app.use("/api/",Contact);


//connection to mongoose to mongoDB
const connecToDB = async() => {
        try{
    await mongoose.connect("mongodb://127.0.0.1:27017/mydatabase");

    
    console.log("connected succesfuly to mongoDB");

        }

    catch(error){
        console.log("error");
        process.exit(1);

    }
};


connecToDB();
const port = 25000;
app.listen(port,() => {


    console.log(`app is running at ${port}`);

})
