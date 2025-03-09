import express, { Express, Request, Response } from "express";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/firebaseConfig";

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", async (req: Request, res: Response) => {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, doc.data());
  });
  res.send("Hello Firebase!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
