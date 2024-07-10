const http = require("http");
const url = require("url");
const fs = require("fs");

const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%ID%}/g, product.id);

  if (!product.organic)
    output = output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};

const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);
const products = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productDataObj = JSON.parse(products);
console.log(productDataObj);

const server = http.createServer((request, response) => {
  const { query, pathname } = url.parse(request.url, true);

  // const pathname = request.url;

  // Overview page
  if (pathname === "/" || pathname === "/overview") {
    response.writeHead(200, { "Content-type": "text/html" });

    const cardsData = productDataObj
      .map((data) => {
        return replaceTemplate(templateCard, data);
      })
      .join("");

    const output = templateOverview.replace("{%PRODUCT_CARDS%}", cardsData);

    // console.log(cardsData);
    response.end(output);

    // Product page
  } else if (pathname === "/product") {
    response.writeHead(200, { "Content-type": "text/html" });
    const productToDisplay = productDataObj[query.id]; // retrieve the element at the position thats coming from the query id.
    const output = replaceTemplate(templateProduct, productToDisplay);

    response.end(output);

    // API
  } else if (pathname === "/api") {
    response.writeHead(200, { "Content-type": "application/json" });
    response.end(products);

    // Not found
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
