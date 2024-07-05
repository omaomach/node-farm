const http = require("http");
const url = require("url");

const server = http.createServer((request, response) => {
  console.log(request.url);

  const pathName = request.url;

  if (pathName === "/" || pathName === "/overview") {
    response.end("This is the OVERVIEW");
  } else if (pathName === "/product") {
    response.end("This is the PRODUCT");
  } else {
    response.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "Headers",
    });
    response.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening to requests on port 8000");
});
