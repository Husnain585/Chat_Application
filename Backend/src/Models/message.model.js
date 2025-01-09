const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        unique: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
    },
    picture: {
        type: String,
        default: ""
    }
},
    {timestamps: true}
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;