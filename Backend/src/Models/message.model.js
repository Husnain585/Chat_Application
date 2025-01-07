const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
    sendId: {
        type: String,
        required: true,
        unique: true
    },
    receiverId: {
        type: String,
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