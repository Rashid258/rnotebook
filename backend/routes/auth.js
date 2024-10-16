const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const router = express.Router();

//Create a user using POST: "api/auth/createuser: No login required
router.post('/createuser', [
    body('name', "enter a valid name").isLength({ min: 3 }),
    body('email', "enter a valid email").isEmail(),
    body('password', "Password must be atleast 8 characters.").isLength({ min: 5 })

], async (req, res) => {
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
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            res.json(user)
    } catch {
        console.error(error => error.message);
        res.status(500).send("Internal Server Error");
    }


});


module.exports = router;