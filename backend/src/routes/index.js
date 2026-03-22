import express from "express";
import authRoute from "./auth.route.js";
import groupRoute from "./group.route.js";

const route = express.Router();

route.use("/auth" , authRoute);
route.use("/group" , groupRoute )

export default route;