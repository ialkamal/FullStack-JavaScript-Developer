import { Request, Response, NextFunction } from "express";

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.body) {
    const { auth_email } = req.body;
    if (!auth_email) {
      res.status(400).send("auth_email missing!");
      return;
    } else if (auth_email !== "ismail@udacity.com") {
      res.redirect("login");
      return;
    }
    next();
  } else {
    res.status(400).send("request body missing!");
  }
};
