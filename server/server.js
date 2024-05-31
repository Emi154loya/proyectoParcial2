const http = require("http");
const fs = require("fs");
const path = require("path");

http
  .createServer((req, res) => {
    const file = req.url == "/" ? "WWW/index.html" : `WWW/${req.url}`;

    if (req.method === "POST" && req.url === "/registro") {
      let data = [];
      req
        .on("data", (value) => {
          data.push(value);
        })
        .on("end", () => {
          const params = Buffer.concat(data).toString();
          const parsedParams = new URLSearchParams(params);

          const nombre = parsedParams.get("nombre");
          const telefono = parsedParams.get("telefono");
          const correo = parsedParams.get("correo");
          const mensaje = parsedParams.get("mensaje");

          const userData = { nombre, telefono, correo, mensaje };

          // Guardar los datos en un archivo JSON
          fs.readFile("users.json", (err, content) => {
            let users = [];
            if (!err) {
              users = JSON.parse(content); // Convertir cadena JSON a objeto
            }
            users.push(userData); // Añadir los nuevos datos al objeto
            fs.writeFile(
              "users.json",
              JSON.stringify(users, null, 2),
              (err) => {
                // Convertir objeto a cadena JSON
                if (err) throw err;
                res.writeHead(200, { "Content-Type": "application/json" });
                res.end(
                  JSON.stringify({ message: "Registro exitoso", userData })
                );
              }
            );
          });
        });
    } else {
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
    }
  })
  .listen(8888);
