import http from "http";
import url from "url";
import { processOrder } from "./service/service.js";

const server = http.createServer();

server.on("request", async (req, res) => {
  if (req.url === "/favicon.ico") {
    res.writeHead(204);
    res.end();
    return;
  }

  const { query } = url.parse(req.url, true);
  const userId = query.userId;

  // Check if userId is provided
  if (!userId) {
    res.writeHead(400, { "Content-Type": "application/JSON" });
    const error = new Error("userId query parameter is required");
    if (process.env.STAGE === "dev") {
      res.end(JSON.stringify({ error: error.message, stack: error.stack }));
    } else {
      res.end(JSON.stringify({ error: error.message }));
    }
    return;
  }

  try {
    const processedOrder = await processOrder(userId);
    res.writeHead(200, { "Content-Type": "application/JSON" });
    res.end(JSON.stringify(processedOrder, null, 2));
  } catch (err) {
    res.writeHead(404, { "Content-Type": "application/JSON" });
    if (process.env.STAGE === "dev") {
      res.end(JSON.stringify({ error: err.message, stack: err.stack }));
    } else {
      res.end(JSON.stringify({ error: err.message }));
    }
  }
});

server.listen(8080);
