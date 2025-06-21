import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

let server: Server;
const PORT = process.env.PORT;
const DB_URL: string = process.env.DB_URI as string;

console.log(PORT);
async function main() {
  try {
    await mongoose.connect(DB_URL);
    console.log("connect to mongoose");
    server = app.listen(PORT, () => {
      console.log(`App is Listening on Port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
