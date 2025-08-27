const http = require("http");
const url = require("url");
const { processOrder } = require("./service/service");

const server = http.createServer();

server.on("request", (req, res) => {
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

  processOrder(userId, (err, processedOrder) => {
    if (err) {
      res.writeHead(404, { "Content-Type": "application/JSON" });
      if (process.env.STAGE === "dev") {
        res.end(JSON.stringify({ error: err.message, stack: err.stack }));
      } else {
        res.end(JSON.stringify({ error: err.message }));
      }
      return;
    }

    res.writeHead(200, { "Content-Type": "application/JSON" });
    res.end(JSON.stringify(processedOrder, null, 2));
  });
});

server.listen(8080);
