const express = require("express");
const {connectDb }= require("./src/Lib/db");
const dotenv = require("dotenv")
const authRouter = require("./src/Routes/auth.route");
const messageRouter = require("./src/Routes/message.route");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origine: "http://localhost:5173/",
    credentials: true
})
);
app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);


app.get("/", (req, res)=> {
    res.send("Hello World");
});

const port = process.env.PORT;
app.listen(port, ()=> {
    console.log(`server is running on Port: ${port}`);
    connectDb();
});