const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;


//REGISTER
router.post("/register", async (req, res) => {
    try {
        // using await makes sure we store the hashed password in our DB and not the Promise
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });
        console.log("User Added Successfully");
        //Save it to the DB
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});


//LOGIN

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            // user with the given username not found
            return res.status(404).json("Username not found");
        }
        // compare the entered password with the hashed password
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        //Removing 
        const { password, ...others } = user._doc;
        if (passwordMatch) {
            // passwords match, user is authenticated
            return res.status(200).json(others);

        } else {
            // passwords don't match, user is not authenticated
            return res.status(401).json("Wrong Password");
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send();
    }
});


module.exports = router;