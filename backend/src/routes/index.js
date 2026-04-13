import express from "express";
import authRoute from "./auth.route.js";
import groupRoute from "./group.route.js";
import userRoute from "./user.route.js";
import messageRoute from "./message.route.js";

const route = express.Router();

route.use("/auth" , authRoute);
route.use("/group" , groupRoute );
route.use("/user" , userRoute);
route.use("/messages", messageRoute);

export default route;