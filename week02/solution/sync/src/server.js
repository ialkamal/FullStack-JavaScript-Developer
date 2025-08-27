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

  try {
    const processedOrder = processOrder(userId);
    res.writeHead(200, { "Content-Type": "application/JSON" });
    res.end(JSON.stringify(processedOrder, null, 2));
    return;
  } catch (err) {
    res.writeHead(404, { "Content-Type": "application/JSON" });
    if (process.env.STAGE === "dev") {
      res.end(JSON.stringify({ error: err.message, stack: err.stack }));
      return;
    }
    res.end(JSON.stringify({ error: err.message }));
    return;
  }
});

server.listen(8080);
