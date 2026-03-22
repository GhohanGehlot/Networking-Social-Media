import express from "express";
import helmet from "helmet";
import cors from "cors";
import mongoSanitize  from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import compression from "compression";
import connectDb from "./configs/dbConnect.js";
import route from "./routes/index.js";



export const app = express();

connectDb();



//middlewares
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({extended : true}));
// app.use(mongoSanitize({ replaceWith: '_' }));
app.use(cookieParser());
app.use(compression());

//routes
app.use('/api/v1' , route )



//error handler

app.use( (err , req , res , next) => {
    return res.json({
        success : false,
        message : err.message
    })
})





