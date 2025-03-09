import { Request, Response } from "express";
import { db, auth } from "../config/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { FirebaseError } from "firebase/app";

export async function userSignUp(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const createdUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = createdUser.user;
    res.status(200).json({
      status: "success",
      message: "User created successfully",
      data: {
        id: user.uid,
        email: user.email,
      },
    });
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorMessage = error.message;
      res.status(500).send({
        status: "failed",
        message: errorMessage,
      });
    } else {
      res.status(500).send({
        status: "failed",
        message: error,
      });
    }
  }
}

export async function updateUserData(req: Request, res: Response) {
  try {
    const updates = {
      recentlyActive: new Date(),
      numberOfRents: req.body.numberOfRents,
      totalAverageWeightRatings: req.body.totalAverageWeightRatings,
    };
    const docRef = doc(db, "users", req.params.id);
    await updateDoc(docRef, updates);
    const updatedUser = (await getDoc(docRef)).data();
    const result = {
      id: docRef.id,
      ...updatedUser,
    };
    res.status(200).json({
      status: "success",
      message: "User data updated successfully",
      data: result,
    });
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
    res.status(200).json({
      status: "success",
      message: "User data fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).send(error);
  }
}
