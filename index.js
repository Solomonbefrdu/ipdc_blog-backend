import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import categoryRoute from "./routes/categories.js";
import postRoute from "./routes/posts.js";
import userRoute from "./routes/users.js";
import { categories } from "./data.js";
import Category from "./models/Category.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoute);
app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);

//// MONGOOSE SETUP
const PORT = process.env.PORT || 6000;
mongoose.set('strictQuery',false);
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=> {
    app.listen(PORT, ()=>{
        console.log(`Server Port: ${PORT}`)
    })
    // Category.insertMany(categories);
}).catch((error) => {
    console.log(`${error} did not connect`)
})