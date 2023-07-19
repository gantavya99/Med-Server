const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const saltRounds = 10;

dotenv.config();
const secretKey = process.env.JWT_SEC;

//REGISTER
router.post('/register', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if the email already exists in the database
      const existingUser = await User.findOne({ email });
  
      if (existingUser) {
        // If the email is already registered, return an error
        return res.status(409).json({ error: 'Email is already registered' });
      }
  
      // If the email is not registered, create a new user and save it to the database
      const newUser = new User({
        email,
        password: await bcrypt.hash(password, saltRounds),
      });
  
      const savedUser = await newUser.save();
      res.status(201).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//LOGIN

router.get('/users', async (req, res) => {
    try {
      // Fetch all users from the database
      const users = await User.find();
      // Return the list of users as a JSON response
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            // user with the given username not found
            return res.status(404).json("Email not found");
        }
        // compare the entered password with the hashed password
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        //Removing 
        const { password, ...others } = user._doc;
        if (passwordMatch) {
            // passwords match, user is authenticated
            const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '3d' });
            return res.status(200).json({ token, ...others });
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