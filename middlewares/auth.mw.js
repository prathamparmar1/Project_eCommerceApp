const auth_config = require("../configs/auth.config")
const user_model = require("../models/user.model")
const jwt = require("jsonwebtoken")

/**
 * Create a mw will check if the request body is proper and correct
 */

const verifySignUpBody = async (req, res, next)=>{

    try{

        //Check for the name
        if(!req.body.name){
            return res.status(400).send({
                message : "Failed ! Name was not provied in request body"
            })
        }

        //check for the email
        if(!req.body.email){
            return res.status(400).send({
                message : "Failed ! Email was not provied in request body"
            })
        }
        //check for the userId
        if(!req.body.userId){
            return res.status(400).send({
                message : "Failed ! userId was not provied in request body"
            })
        }

        //Check if the user with the same userId is already present
        const user = await user_model.findOne({userId : req.body.userId})

        if(user){
            return res.status(400).send({
                message : "Failed ! user with same userId is already present"
            })
        }

        next()

    }catch(err){
        console.log("Error while validating the request object", err)
        res.status(500).send({
            message :"Error while validating the request body"
        })
    }
}

const verifySignInBody = async (req, res, next)=>{
    if (!req.body.userId){
        return res.status(400).send({
            message: "UserId is not provided"
        })
    }

    if (!req.body.password){
        return res.status(400).send({
            message: "Password is not provided"
        })
    }
    next()
}

const verifyToken = (req,res,next)=>{
    //check if the token is present in header
    const token = req.headers['x-access-token']
    if(!token){
        return res.status(403).send({
            message: "No token found: Unauthorized"
        })
    }

    //if valid then move to next step
    //checking if valid
    jwt.verify(token, auth_config.secret ,async(err,decoded)=>{
        if (err){
            return res.status(401).send({
                message: "UnAuthorized"
            })
        }

        const user = await user_model.findOne({userId:decoded.id})
        if(!user){
            return res.status(400).send({
                message :"User for this token does not exist"
            })
        }
        req.user = user
        next()
    })
   
}

const isAdmin = (req,res,next)=>{
    const user = req.user
    if(user&& user.userType=="ADMIN"){
        next()
    }else{
        return res.status(403).send({
            message: "Only admin users are allowed to access this endpoints"
        })
    }
}

module.exports = {
    verifySignUpBody : verifySignUpBody,
    verifySignInBody : verifySignInBody,
    verifyToken : verifyToken,
    isAdmin : isAdmin
}