import express from "express";
import { fetchUserData, updateUserData, userSignUp } from "../controller/api";
import { firebaseAuth } from "../middleware/authMiddleware";
const route = express.Router();

route.post("/sign-up", userSignUp);
route.post("/sign-in");

route.use(firebaseAuth);
route.patch("/update-user-data/:id", updateUserData);
route.get("/fetch-user-data", fetchUserData);

export { route };
