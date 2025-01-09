const express = require("express");
const User = require("../Models/user.model");
const Message = require("../Models/message.model");
const cloudinary = require("../Lib/cloudinary");
module.exports = {
  getUserForSidebar: async (req, res) => {
    try {
      const loggedInUserId = req.user._id;
      const fillterUser = await User.find({
        _id: { $ne: loggedInUserId },
      }).select("-password");
      return res.status(400).json(fillterUser);
    } catch (error) {
      console.log("Error in GetUserForSidebar Controller", error.message);
      res.status(501).json({ message: "Internal Server Error" });
    }
  },
  getMessages: async (req, res) => {
    try {
        const {id:userToChatId} = req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or: [
                {senderId : myId, receiverId: receiverId},
                {senderId: userToChatId, receiverId: myId}
            ]
        }); 
        return res.status(400).json(messages);
    } catch (error) {
      console.log("Error in GetMessage Controller", error.message);
      res.status(501).json({ message: "Internal Server Error" });
    }
  },
  sendMessage: async (req, res) => {
    try {
        const { text, image} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let imageURL;
        if(imageURL) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageURL = uploadResponse.secure_url;
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageURL
        });
        await newMessage.save();
        return res.status(201).json();
    } catch (error) {
        console.log("Error in sendMessage Controller", error.message);
      res.status(501).json({ message: "Internal Server Error" });
    }
  }
};
