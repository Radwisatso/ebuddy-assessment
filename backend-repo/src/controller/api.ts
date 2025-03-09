import { Request, Response } from "express";
import { db } from "../config/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export function updateUserData(req: Request, res: Response) {}

export async function fetchUserData(req: Request, res: Response) {
  const users = await getDocs(collection(db, "users"));
  const result = users.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  res.send(result);
}
