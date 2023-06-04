const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    menu: { type: String, required: true },
    type: { type: String, required: true },//chinese dessert
    description:{ type:String,default: ''},
    price: { type: String, default: '' },
    images: [{ type: String }],
    hotelName: { type: mongoose.Schema.Types.ObjectId, ref: 'storemasters', required: true },
    rating: { type: Number, default: 0 },
    offer: { type: Number, default: 0 },
})

module.exports = mongoose.model("productmasters", productSchema);

//     "menu": "Icecreame",
//     "type": "Dessert",//chinese dessert
//     "description":"Its a chocobar ice creame with chocolate flavour",
//     "price": "479",
//     "images": ["www.icecreame.com"],
//     "hotelName": { "id": "63458dafb2e6e78fe8634562", "ref": 'storemaster' },//shreji object id
//     "rating": "4.7",
//     "offer": "50%",
