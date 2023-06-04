
const Product = require('../models/storeProduct');

module.exports.GetStoreProducts = async (req, resp) => {
    console.log("in products")
    const productList = await Product.find().populate("hotelName");
    console.log(productList,"productList")
    // const productList = await Product.find().select('name image -_id');//here only passed parameter we get
    if (!productList) {
        resp.send(500).json({
            success: false
        })
    }
    resp.send(productList);

}

module.exports.CreateProduct = async (req, resp) => {

console.log(req.body.hotelName,req.body.hotelName.ref,"request data")

    const product = new Product({
        menu: req.body.menu,
        type: req.body.type,
        description: req.body.description,
        price: req.body.price,   
        images: req.body.images,
        brand: req.body.brand,
        hotelName:req.body.hotelName,
        rating: req.body.rating,
        offer: req.body.offer,
    })

    product.save().then((cretatedProduct) => {
        resp.status(201).json(cretatedProduct)
    }).catch((err) => {
        resp.status(500).json({
            error: err,
            success: false
        })
    })

}


module.exports.GetProductById = async (req, resp) => {
    console.log(req.params, "params");

    const product = await Product.findById(req.params.id);

    if (!product) {
        resp.status(500).json({ success: false })
    }
    resp.send(product)
}