const mongoose = require('mongoose');

module.exports = {
    connectDb: async () => {
        try {
            const connection  = await mongoose.connect(process.env.MONGODB_URL);
            console.log(`MongoDB Connection sucessfull: ${connection.connection.host}`);
        } catch (error) {
            console.log("MongoDb Connection Error: ", error);
        }
    }
}