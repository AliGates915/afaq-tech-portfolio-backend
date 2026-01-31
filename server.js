import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contact.js";

 const app=express();
await connectDB();
app.use(cors({
    origin:["http://localhost:3000","https://afaq-tech-portfolio.vercel.app","https://afaq-technologies-portfolio.vercel.app"],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}));
app.use(express.json());

const PORT=process.env.PORT || 5000;

//check server
app.get("/",(req,res)=>{
    res.send("API is running...");
})
app.use("/api/contact",contactRoutes);
app.listen(PORT,()=>{
    console.log(`✅ Server is running on port ${PORT}`);
})
