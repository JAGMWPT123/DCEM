const express = require("express");
const mongoose = require("mongoose");
// const cors = require('cors')
const bodyParser = require("body-parser");
const User = require("./modules/user.js");
const path = require('path')
var authRouter = require('./routes/auth');

require('dotenv').config()
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


// app.use(cors())
app.use(express.static(path.join(__dirname,'/views')))
app.use(express.static(path.join(__dirname,'/puplic')))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

//########## DB CONNECTION
var connect = async () => {
    try {
        await mongoose.connect(process.env.mongodb1);
        console.log(">> mangodb is now alive!!!");
    } catch (error) {
        throw error;
    }
};
mongoose.connection.on("disconnected", () => {
    console.log("DB disconnected");
});
//#######################


                        //Routes//


app.get('/',(req,res)=>{
    res.render(path.join(__dirname ,'index.html'))
})
app.use('/',authRouter);








//#localhost..
const PORT = process.env.PORT || 3000;
const listener = app.listen(PORT,()=>{
    console.log(`>> server is live on port ${PORT}`)
    connect();
})