import { getAuthorById, Author } from "../data";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const checkAuthorID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const author: Author | null = await getAuthorById(Number(id));
  if (!author) res.status(404).json({ message: "Author Not Found!" });
  else {
    req.params.author = JSON.stringify(author, null, 2);
    next();
  }
};

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token: string | undefined = req.headers.authorization?.split(" ")[1];

  try {
    const payload = jwt.verify(token || "", process.env.JWT_SECRET as string);
    // Optionally attach payload to request for downstream use
    if (payload) {
      (req as any).user = payload;
      next();
      return;
    } else throw Error("Invalid or missing token");
  } catch (err) {
    res.status(401).json(err);
  }
};
