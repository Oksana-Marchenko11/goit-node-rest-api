import express from "express";
import morgan from "morgan";
import cors from "cors";
import contactsRouter from "./routes/contactsRouter.js";
import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";

const {DB_HOST, PORT=3000} = process.env;

dotenv.config();
const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

mongoose.connect(DB_HOST)
.then(()=>
{app.listen(PORT, () => {
  console.log("Server is running. Use our API on port: 3000");
});
  console.log("DB is connecting")})
.catch((error)=>{
console.error(error.message);
process.exit(1);
})

