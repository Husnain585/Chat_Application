const express = require("express");
const {connectDb }= require("./src/Lib/db");
const dotenv = require("dotenv")
const authRouter = require("./src/Routes/auth.route");
const cookieParser = require("cookie-parser");
const app = express();

dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);


app.get("/", (req, res)=> {
    res.send("Hello World");
});

const port = process.env.PORT;
app.listen(port, ()=> {
    console.log(`server is running on Port: ${port}`);
    connectDb();
});