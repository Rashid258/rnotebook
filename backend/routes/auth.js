//Get all packages from npm
const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcrypt');
const fetchuser = require('../middleware/fetchuser');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "Haadi is an intelligent boy"


//ROUTE 1: Create a user using POST: "api/auth/createuser: No login required
router.post('/createuser', [
    body('name', "enter a valid name").isLength({ min: 3 }),
    body('email', "enter a valid email").isEmail(),
    body('password', "Password must be atleast 8 characters.").isLength({ min: 5 })

],
    async (req, res) => {
        console.log(req.body)
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Check whether the user with this email exists already
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "Sorry a user with this email already exists" });
            }

            // Encrypt the password
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt)

            //create new user
            user = await User.create({
                name: req.body.name,
                password: secPass, 
                email: req.body.email
             });
             
            //  Get data from user Id because we use id as index in mongodb
             const data = {
                user:{
                    id: user.id
                }
             }
            //  created an authoToken for more security
             const authToken = jwt.sign(data, JWT_SECRET)
            res.json({authToken})

        }
        //Catch error if occurred
        catch {
            console.error(error => error.message);
            res.status(500).send("Internal Server Error");
        }


    });

//ROUTE 2: Authenticate a user using POST: "api/auth/login: No login required
router.post('/login', [
    body('email', "enter a valid email").isEmail(),
    body('password', "Password cannot be blank").exists()
], async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check whether the user with this email exists already
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }
        // Compare password
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials" });
        }

        //  Get data from user Id because we use id as index in mongodb
        const data = {
            user: {
                id: user.id
            }
        }
        //   Get authoToken by putting correct credientials
        const authToken = jwt.sign(data, JWT_SECRET)
        res.json({ authToken });
         
    } catch (error) {
        console.error(error => error.message);
        res.status(500).send("Internal Server Error");
    }

});

//ROUTE 3: GET Loggedin user details using: POST "api/auth/getuser" login required;
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error => error.message);
    }})
module.exports = router;