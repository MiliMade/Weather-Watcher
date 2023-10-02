import express from "express";
import mongoose from "mongoose";
import axios from "axios"
import path from "path";
import {dirname} from "path";
import { fileURLToPath } from "url";
import expressLayouts from "express-ejs-layouts";
import indexRoutes from "./routes/index.js"
import 'dotenv/config' 

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = 4000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layouts/layout")

app.use(expressLayouts)
app.use(express.static("public"))
app.use(express.urlencoded({extended:true}))

app.use('/', indexRoutes) 

app.listen(process.env.PORT || PORT, ()=>{
  console.log(`Can you believe it! Your server's working on port ${PORT}`);
} )