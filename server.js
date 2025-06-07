/**
 * this is  the staring file of the project
 */

const express = require("express")
const mongoose = require("mongoose")
const app = express()
const server_config = require("./configs/server.config")
const db_config = require("./configs/db.config")
const user_model = require("./models/user.model")
const bcrypt = require("bcryptjs")

//connection with databse
mongoose.connect(db_config.DB_URL)

const db = mongoose.connection

db.on("error", ()=>{
    console.log("Error in connection")
})

db.once("open", ()=>{
    console.log("Connection success to the database")
    init()
})

async function init(){
    try{
        let user =await user_model.findOne({userId:"admin"})

        if (user){
            console.log("Admin is already present")
            return
        }
    }catch(err){
        console.log("Error in finding the user", err)
    }
    
    try{
        user = await user_model.create({
            username :"pratham",
            userId : "admin",
            email : "pratham@gmail.com",
            userType : "ADMIN",
            password : bcrypt.hashSync("welcomme1",8)
        })
        console.log("Admin Created", user)
    }

    catch(err){
        console.log("Error in finding the user",err)
    }
}

// staring the server
app.listen(server_config.PORT, ()=>{
    console.log("Server Started at", server_config.PORT)
})



