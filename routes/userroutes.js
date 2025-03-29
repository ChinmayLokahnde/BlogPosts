const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const user = require("../models/user");


const router = express.Router();

router.post("/register", async (res,req)=>{
    try{
        const {username, email, password} = req.body;
        const hashedPasword = await bcrypt.hash(password, 10);
        const newUser = new user({username, email, password:hashedPasword});
        await newUser.save();
        res.status(201).json({msg:"User registerd successfully"});
    }catch(error){
        res.status(500).json({msg:"Error in registering use profile"});
    }
});

router.post("/login", async(res, req)=>{
    try{
        const { email, password } = req.body;
        const user = await user.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
         res.json({ token, user });
    }catch(error){
        res.status(500).json({ error: "Error logging in" });
    }
});


module.exports = router;
