import { Request, Response, NextFunction } from "express";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

export function firebaseAuth(req: Request, res: Response, next: NextFunction) {
  onAuthStateChanged(auth, (user) => {
    console.log(user);
    if (user) {
      next();
    } else {
      res.status(401).send({
        status: "failed",
        message: "Authentication failed",
      });
    }
  });
}
