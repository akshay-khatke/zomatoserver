const mongoose = require('mongoose');
//register form
const storeRegisterSchema = mongoose.Schema({
    hotelName: { type: String, required: true },
    hotelType: { type: String, required: true },//veg or non veg
    address:{ type:String,default: ''},
    description: { type: String, default: '' },
    images: [{ type: String }],
    email: { type: String, unique: true },
    password: { type: String },
    mobileNo:{type:Number,default: 0},
    token:{type: String}
    // category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
   
})

module.exports = mongoose.model("storemasters", storeRegisterSchema);


    // "hotelName":"Shreejee"
    // "hotelType": "Veg",
    // "address":"Hinjavadi",
    // "description": "It is the best restaurant for veg we get the tasty food here",
    // "images": ["www.images.com"],
    // "email": "shreeji@gmail.com",
    // "password": "shreejee",
    // "mobileNo":"8768958588"