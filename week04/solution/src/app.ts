import express from "express";
import routes from "./routes";
import helmet from "helmet";
import cors from "cors";

const app = express();
const port = 3000;

app.use([express.json(), cors(), helmet()]);
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(port, () => {
  console.log("Listening on localhost:", port);
});
