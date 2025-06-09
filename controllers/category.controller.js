/**
 * controller for creating the category
 * 
 * POST- localhost:8888/ecomm/api/v1/categories
 */
const categoryModel = require("../models/category.model")
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


exports.fetchCategory =async (req,res)=>{
    const category = await category_model.findOne({name : req.body.name})

    if(category == null){
        res.status(401).send({
            message: "Category not found"
        })
    }
    res.status(200).send({
        name : category.name,
        description : category.description
    })

    
}