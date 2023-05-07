const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;


//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, saltRounds)
    });
    console.log("User Added Successfully");
    //Save it to the DB
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
    }
    catch (err) {
        res.status(500).json(err);
    }
});


//LOGIN

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        const hash = bcrypt.compareSync(req.body.password,User.password);
    }
    catch (err) {

    }
})

module.exports = router;