const mongoose = require('mongoose');
const {isValidObjectId} = mongoose;
const Product = require('../models/product');
const Category = require('../models/category');


const allProducts = async (req, res) =>{

    // try {
    //     const products = await Product.find().select('name image price');

    //     if(!products){
    //         return res.status(400).send({msg: "Product not found"});
    //     }
    
    //     return res.status(201).json({products});
    // } catch (error) {
    //     return res.status(500).json({msg: "Something wrong"});
    // }
    const products = await Product.find().select('-_id');

    if(!products){
        return res.status(500).json({success: false});
    }

    res.send(products)

}
const productDetail = async (req, res) =>{
    const product  = await Product.findById(req.params.id).populate('category')
    if(!product) return res.status(400).json({success: false, msg: "Product not found"});

    res.json(product)
}
const createProduct = async (req, res) =>{
    try {
        const {name, description, richDescription, image, images, brand, price, category, countInStock, rating, numReviews, isFeatured} = req.body;

        const categoryExists = await Category.findById(category);
        if(!categoryExists) return res.status(400).send('Invalid Category.')

        const product = new Product({
            name,
            description,
            richDescription,
            image,
            images,
            brand,
            price,
            category,
            countInStock,
            rating,
            numReviews,
            isFeatured
        });

        await product.save();

        res.send(product)


    } catch (err) {
        return res.status(500).json({error: err.message});
    }
}
const updateProduct = async (req, res) =>{

    const id = req.params.id;
    if(!isValidObjectId(id)){
        return res.status(400).send('Invalid Prodcutid.')
    }

    const {name, description, richDescription, image, images, brand, price, category, countInStock, rating, numReviews, isFeatured} = req.body;

    const categoryExists = await Category.findById(category);
    if(!categoryExists) return res.status(400).send('Invalid Category.')

    const product = new Product(id,{
        name,
        description,
        richDescription,
        image,
        images,
        brand,
        price,
        category,
        countInStock,
        rating,
        numReviews,
        isFeatured
    },{new:true});
    if(!product){
        res.status(400).json({success: false, msg:"Product cannot updated"})
    }

    res.send(product)
}
const deleteProduct = async (req, res) =>{
    const id = req.params.id;
    Product.findByIdAndRemove(id)
            .then(product=>{
                if(product){
                return res.status(500).json({success: true, msg:"Product deleted"})
                }else{
                return res.status(500).json({success: false, msg: "Product do not deleted"})
                }
            })
            .catch(err=>{
                return res.status(500).json({success: false, error: err})
            })
}


const productCount = async (req, res) =>{
    const productCount = await Product.countDocuments((count)=>count);

    if(!productCount){
        return res.status(500).json({success: false})
    }

    res.send(productCount)
}

const featuredProduct = async (req, res) =>{
    const count = req.params.count ? req.params.count : 0
    const featuredProduct = await Product.find({isFeatured:true}).limit(+count);
    if(!featuredProduct){
        return res.status(500).json({success: false})
    }
    res.send(featuredProduct)
}

module.exports = {
    allProducts,
    productDetail,
    createProduct,
    updateProduct,
    deleteProduct,
    productCount,
    featuredProduct,
}