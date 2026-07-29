import express from "express";
import "dotenv/config";

//VP6P1mBdIGLY3J6o

const app = express()
const port = process.env.PORT
app.listen(port, () => console.log(`Server is Running ${port}`));
