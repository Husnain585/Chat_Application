const express = require("express");
const User = require("../Models/user.model");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../Lib/utilities");
const cloudinary = require("../Lib/cloudinary");
module.exports = {
  Signup: async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
      if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All field are required" });
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be 6 character" });
      }
      const user = await User.findOne({ email });
      if (user)
        return res.status(400).json({ message: "Email Already Exsist" });
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new User({
        fullName: fullName,
        password: hashedPassword,
        email: email,
      });
      if (newUser) {
        // Jwt Token would place here
        generateToken(newUser._id, res);
        await newUser.save();
        res.status(201).json({
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          profilePic: newUser.profilePic,
        });
      } else {
        res.status(400).json({ message: "Invalid User" });
      }
    } catch (error) {
      console.log("Error in Signup Controller", error.message);
      res.status(501).json({ message: "Internal Server Error" });
    }
  },
  Login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid Credenial" });
      }
      const isCorrectPassword = await bcrypt.compare(password, user.password); // user.password is save in database
      if (!isCorrectPassword) {
        return res.status(400).json({ message: "Invalid Credenial" });
      }
      generateToken(user._id, res);
      res.status(200).json({
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        profilePic: user.profilePic,
      });
    } catch (error) {
      console.log("Error in Login Controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  Logout: async (req, res) => {
    try {
      res.cookie("jwt", "", { maxAge: 0 });
      res.status(200).json({ message: "Logout Successfully!" });
    } catch (error) {
      console.log("Error in Login Controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  updateProfile : async (req, res) => {
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;
        if(!profilePic){
            return res.status(400).json({ message: "ProfilePic is not Provided" });
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updateUser = await User.findByIdAndUpdate(userId, {profilePic:uploadResponse.secure_url}, {new: true});
        res.status(200).json(updateUser); 
    } catch (error) {
        console.log("Error in ProfilePic Controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  checkAuth: (req, res) => {
    try {
        console.log("check");
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in CheckAuth Controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
