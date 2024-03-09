
const express = require('express');
const router = express.Router();
const User= require("../models/user");
const bcrypt= require("bcrypt");

// User Registartion..
router.post("/register", async(req, res)=>{
    try {
        const { email, username, password } = req.body;

        const hashPassword = await bcrypt.hashSync(password, 10);

        const user = new User({ email, username, password: hashPassword });
        await user.save().then(() =>
            res.status(200).json({message:"SignUp Succesfull.."})
        );

    } catch (error) {
        console.log(error);
        res.status(200).json({message:"User Already Exist.."});
        
    }
});


// Login auth
router.post("/signin", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(200)
          .json({ message: "User not found. Please Sign Up First" });
      }
  
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!isPasswordCorrect) {
        return res.status(200).json({ message: "Password is not correct" });
      }
  
      const { password, ...others } = user._doc;

      res.status(200).json({ user: others });
    } 
    catch (error) {
      console.error(error);
      res.status(200).json({ message: "Internal Server Error" });
    }
  });

// Export the router directly
module.exports = router;


