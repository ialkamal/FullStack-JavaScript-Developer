import express, { Application, Request, Response } from "express";
import cors from "cors";
import booksRoute from "./api";
import * as dotnenv from "dotenv";
import bcrypt from "bcrypt";
import { createUser, getUserByEmail, User } from "./data";
import jwt from "jsonwebtoken";
dotnenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.SERVER_PORT;

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to Udacity Full Stack Development Course!" });
});

app.post("/signup", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const hash = bcrypt.hashSync(
    password + process.env.PEPPER,
    Number(process.env.SALT)
  );

  const newUser: User = await createUser({ name, email, hash });

  if (newUser)
    return res.status(201).json({
      User: { name: newUser.name, email: newUser.email },
      message: "User created successfully!",
    });
  else return res.status(400).json({ message: "error in creating the user" });
});

app.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user: User | null = await getUserByEmail(email);
    if (!user) throw new Error("User not found");
    if (bcrypt.compareSync(password + process.env.PEPPER, user.hash)) {
      const token: string = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        process.env.JWT_SECRET ?? "hello"
      );
      res.status(200).json({ token, message: "Login successful!" });
    } else res.status(401).json({ message: "Login Failed!" });
  } catch (e) {
    res.status(404).json(e);
  }
});

app.use("/api", booksRoute);

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
