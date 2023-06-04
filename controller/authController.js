const { validationResult } = require("express-validator");
const StoreMaster = require('../models/authMaster');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

module.exports.LoginUser = async (req, resp) => {
    console.log(req.query, "login user in api")

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return resp.status(400).json({ errors: errors.array() })
    }

    try {
        // Get user input
        const { email, password } = req.query;
       
        // Validate user input
        if (!(email && password)) {
            resp.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const storeData = await StoreMaster.findOne({email});
        
        if (storeData && (await bcrypt.compare(password, storeData.password))) {
            // Create token
            const token = jwt.sign(
                { email },
                "akshaybdfbjsdfdsnm",//secrete key
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            storeData.token = token;
console.log(storeData,"storeData check")
            // user
            // resp.setHeader('Content-Type', 'application/json')
            resp.status(200).json({
                statusCode: 200,
                message: 'hotel is logged in',
                data: storeData,
                errors: {},

            })
        }else{
        resp.status(400).send("Invalid Credentials");
    }
    } catch (err) {
        return resp.status(500).json({
            statusCode: 500,
            message: 'hotel user not logged in',
            data: {},
            errors: err
        })
    }


}



module.exports.Register = async (req, resp) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return resp.status(400).json({ errors: errors.array() })
    }

    try {

        const { hotelName, hotelType, description, address, email, password, images, mobileNo } = req.body;

        if (!(email && password && hotelName && hotelType && mobileNo && address && images)) {
            resp.status(400).send("All input is required");
        }

        // check if user already exist
        // const oldUser = await StoreMaster.findOne({ email });
        // console.log("in register")


        // if (oldUser) {
        //     return resp.status(409).send("User Already Exist. Please Login");
        // }
        
        const encryptedPassword = await bcrypt.hash(password, 10);
        const storeUser = new StoreMaster({
            hotelName: hotelName,
            hotelType: hotelType,
            address: address,
            description: description,
            images: images,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
            mobileNo: mobileNo,
            
        });

        const token = jwt.sign(
            { email },
            "akshaybdfbjsdfdsnm",
            {
                expiresIn: "2h",
            }
        );

        storeUser.token = token;
        storeUser.save().then((userData) => {
            consol.log(userData, "user Data")
            resp.status(201).json(userData)
        }).catch((err) => {
            resp.status(500).json({
                errors: err,
                success: false
            })
        })
    } catch (err) {
        console.log('error while register ', err)
    }
}




