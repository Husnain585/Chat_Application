const express = require("express");
const jwt = require("jsonwebtoken")

const generateToken = async (userId) => {
    const token = await jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d"    
    });
    res.cookie("jwt", token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // MiliSecond
        httpOnly: true, // prevent XSS attack cross-site scripting attack 
        sameSite: "strict", // CSRF attacks cross-site request forgery attack
        secure: process.env.NODE_ENV !== "development"
    });

}
module.exports = generateToken;