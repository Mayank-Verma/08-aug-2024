import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute.js";

mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING)
  .then(() => console.log("Connected to Database successfully!"));

const app = express();
app.use(express.json());
app.use(cors());

//    /api/my/user
app.use("/api/my/user", myUserRoute);

app.listen(7000, (err) => {
  if (err) console.log(`server met with an error: ${err}`);
  else console.log("Server started!");
});
