import express, { Express, Request, Response } from "express";
import { route } from "./routes/route";

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", async (req: Request, res: Response) => {
  res.send("Hello Ebuddy!");
});

app.use(route);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
