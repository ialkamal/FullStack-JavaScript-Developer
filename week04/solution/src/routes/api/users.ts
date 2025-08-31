import { Router } from "express";
import { getUsers, addUser } from "../../data/index";
import { USER } from "../../types";
import { auth } from "../../middleware/index";

const userRoutes = Router();

userRoutes.get("/", async (req, res) => {
  const users: USER[] = await getUsers();
  const userId = req.query.userId;
  if (!userId) {
    res.status(200).send(JSON.stringify(users));
  } else {
    const user: USER | unknown = users.find((user) => user.id === +userId);
    if (user) {
      res.status(200).send(JSON.stringify(user));
    } else {
      res.status(404).send(JSON.stringify({ error: "User not found" }));
    }
  }
});

userRoutes.post("/", auth, async (req, res) => {
  const { newUser } = req.body;
  if (!newUser)
    res.status(400).send(JSON.stringify({ error: "No new user found!" }));
  else {
    if (!newUser.name || !newUser.email)
      res
        .status(400)
        .send(
          JSON.stringify({ error: "No name or email in new user object!" })
        );
    else {
      try {
        const addedUser = await addUser(newUser);
        res.status(200).send(JSON.stringify(addedUser));
      } catch (err) {
        res
          .status(500)
          .send(JSON.stringify({ error: "Error in adding user!" }));
      }
    }
  }
});

export default userRoutes;
