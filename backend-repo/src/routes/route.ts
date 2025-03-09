import express from "express";
import { fetchUserData, updateUserData } from "../controller/api";
const route = express.Router();

route.patch("/update-user-data/:id", updateUserData);
route.get("/fetch-user-data", fetchUserData);

export { route };
