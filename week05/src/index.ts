const express = require("express");
import type { Request, Response } from "express";
const { apiRoute } = require("./routes/index");

const app = express();
const PORT = 3000;

app.use("/api", apiRoute);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ deployment: "development" });
});



app.listen(PORT, () => {
  console.log("Listening to port: ", PORT);
});
