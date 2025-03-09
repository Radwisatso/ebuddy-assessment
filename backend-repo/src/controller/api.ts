import { Request, Response } from "express";
import { db } from "../config/firebaseConfig";
import { collection, doc, getDocs, updateDoc } from "firebase/firestore";

export async function updateUserData(req: Request, res: Response) {
  try {
    const updates = {
      recentlyActive: new Date(),
      numberOfRents: req.body.numberOfRents,
      totalAverageWeightRatings: req.body.totalAverageWeightRatings,
    };
    const docRef = doc(db, "users", req.params.id);
    await updateDoc(docRef, updates);
    res.status(200).send("User data updated successfully");
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function fetchUserData(req: Request, res: Response) {
  try {
    const users = await getDocs(collection(db, "users"));
    const result = users.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error);
  }
}
