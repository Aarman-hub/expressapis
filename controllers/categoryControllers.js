const Category = require('../models/category');


const allCategories = async (req, res) =>{
    const category = await Category.find();

    try {
        if(!category){
            return res.status(400).send({msg: "Category not found"});
        }
    
        return res.status(201).json({category});
    } catch (error) {
        return res.status(500).json({msg: "Something wrong"});
    }
}

const createCategory = async (req, res)=>{

    try {

        const {name, icon, color} = req.body;

        const exists = await Category.findOne({name});

        if(exists){
            return res.status(400).json({msg: "Category already exists"})
        }

        const category = new Category({
            name,
            icon,
            color
        });

         await category.save();
    
        return res.status(200).send(category)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

const updateCategory = async (req, res) =>{
    const {name, icon, color} = req.body;
    const id = req.params.id

    const category = await Category.findByIdAndUpdate(id, {
        name,
        icon,
        color
    }, {new:true});
    if(!category){
        res.status(400).json({success: false, msg:"Category cannot be created"})
    }

    res.send(category)
}

const deleteCategory = (req, res) =>{

    const id = req.params.id;
    Category.findByIdAndRemove(id)
            .then(category=>{
                if(category){
                return res.status(500).json({success: true, msg:"Category deleted"})
                }else{
                return res.status(500).json({success: false, msg: "Category do not deleted"})
                }
            })
            .catch(err=>{
                return res.status(500).json({success: false, error: err})
            })
}

module.exports = {
    allCategories,
    createCategory,
    updateCategory,
    deleteCategory,
}