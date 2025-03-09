import express from "express";
import { fetchUserData } from "../controller/api";
const route = express.Router();

route.patch("/update-user-data");
route.get("/fetch-user-data", fetchUserData);

export { route };
