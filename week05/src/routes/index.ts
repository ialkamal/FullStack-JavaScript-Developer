import type { Request, Response } from "express";
const { Router } = require("express");
const { charactersRoute } = require("./api/characters");

const apiRoute = Router();

apiRoute.use("/characters", charactersRoute);

apiRoute.get("/", (req: Request, res: Response) => {
  res.status(200).json({ status: "API is up!" });
});



module.exports = { apiRoute };
