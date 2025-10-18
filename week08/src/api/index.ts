import { Router, Request, Response } from "express";
import {
  createAuthor,
  deleteAuthor,
  getAuthorById,
  getAllAuthors,
  Author,
  updateAuthor,
} from "../data";
import { checkAuthorID, auth } from "../middleware";

const booksRoute = Router();

booksRoute.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "API is up!" });
});

booksRoute.get("/authors", auth, async (req: Request, res: Response) => {
  const authors: Author[] = await getAllAuthors();
  res.status(200).json(authors);
});

booksRoute.get(
  "/authors/:id",
  checkAuthorID,
  async (req: Request, res: Response) => {
    const authorString = req.params.author;
    if (!authorString) {
      return res.status(400).json({ error: "Author parameter is missing." });
    }
    res.status(200).json(JSON.parse(authorString));
  }
);

booksRoute.delete(
  "/authors/:id",
  checkAuthorID,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const authorString = req.params.author;
    if (!id)
      return res.status(400).json({ message: "id is required in params" });
    if (!authorString)
      return res.status(400).json({ message: "author is required in params" });
    const author: Author = JSON.parse(authorString);
    await deleteAuthor(Number(id));
    res.status(200).json({
      message: "Author deleted Successfully",
      author,
    });
  }
);

booksRoute.post("/authors", async (req: Request, res: Response) => {
  console.log(req.body);
  const { name, bio } = req.body;
  if (!name) res.status(400).json({ message: "You need a name attribute" });
  else if (!bio) res.status(400).json({ message: "You need a bio attribute" });

  const new_author = await createAuthor({ name, bio });
  res.status(201).json(new_author);
});

booksRoute.put(
  "/authors/:id",
  checkAuthorID,
  async (req: Request, res: Response) => {
    const { name, bio } = req.body;
    const { id } = req.params;
    const authorString = req.params.author;
    if (!id)
      return res.status(400).json({ message: "id is required in params" });
    if (!authorString)
      return res.status(400).json({ message: "author is required in params" });
    let author: Author = JSON.parse(authorString);
    author = { ...author, name, bio };
    delete author.id;
    const updated_author = await updateAuthor(Number(id), author);
    if (!updated_author) {
      return res
        .status(500)
        .json({ message: "Author was not updated correctly." });
    }
    res.status(200).json(updated_author);
  }
);

export default booksRoute;
