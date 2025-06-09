/**
 * controller for creating the category
 * 
 * POST- localhost:8888/ecomm/api/v1/categories
 */
const category_model = require("../models/category.model")

exports.createNewCategory = async (req,res)=>{

    //read the req body
    // create the catefory object
    const cat_data = {
        name: req.body.name,
        description : req.body.description
    }

    try{
        // insert into mongodb
         const category = await category_model.create(cat_data)    
         return res.status(201).send(category)
    }
    catch(err){
        console.log("Error in creating category",err)
        res.status(500).send({
            message: "Error while creating the category"
        })
    }


    //return the response of the created catergory

}