const express = require("express");
const User = require("../Models/user.model");
const bcrypt = require("bcryptjs");
module.exports = {
    Signup: async (req, res) => {
        const {fullName, email, password, } = req.body;
        try {
            if(password.length < 6){
                return res.status(400).json({message: "Password must be 6 character"});
            }
            const user = await User.findOne({email});
            if(user) return res.status(400).json({message: "Email Already Exsist"});
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const newUser = new User({
                fullName: fullName,
                password: hashedPassword,
                email: email
            })
            if (newUser) {
                // Jwt Token would place here
                
            }
            else {
                res.status(400).json({message: "Invalid User"});
            }
        } catch (error) {
            
        }
    },
    Login: async (req, res) => {
        res.send("Login Controller");
    },
    Logout: async (req, res) => {
        res.send("Login Controller");
    }
}