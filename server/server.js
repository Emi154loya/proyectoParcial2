const http = require("http");
const fs = require("fs");

http
  .createServer((req, res) => {
    const file = req.url == "/" ? "../WWW/index.html" : `../WWW/${req.url}`;

    if (req.url == "/registro") {
      let data = [];
      req
        .on("data", (value) => {
          data.push(value);
        })
        .on("end", () => {
          let params = Buffer.concat(data).toString();
          res.write(params);
          res.end();
        });
    }

    fs.readFile(file, (err, data) => {
      if (err) {
        // Mandar 404
        res.writeHead(400, { "Content-Type": "text/html" });
        res.write("Not found");
        res.end();
      } else {
        const extension = req.url.split(".").pop();
        switch (extension) {
          case "txt":
            res.writeHead(200, { "Content-Type": "text/plain" });
            break;
          case "html":
            res.writeHead(200, { "Content-Type": "text/html" });
            break;
          case "jpg":
            res.writeHead(200, { "Content-Type": "image/jpg" });
            break;
          case "css":
            res.writeHead(200, { "Content-Type": "text/css" });
            break;
        }
        res.write(data);
        res.end();
      }
    });
  })
  .listen(8888);
