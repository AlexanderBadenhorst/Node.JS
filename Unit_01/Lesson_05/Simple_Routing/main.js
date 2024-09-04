const routeResponseMap = {
  "/info": "<h1>Info Page</h1>",
  "/contact": "<h1>Contact Us</h1>",
  "/about": "<h1>Learn More About Us.</h1>",
  "/hello": "<h1>Say hello by emailing us <a href=\"https://mail.google.com/mail\">here</a></h1>",
  "/error": "<h1>404 Not Found</h1><p>The page you are looking for does not exist.</p>",
};

const port = 3000;
const http = require("http");
const httpStatus = require("http-status-codes");

const app = http.createServer((req, res) => {
  res.writeHead(httpStatus.OK, {
    "Content-Type": "text/html",
  });
  //checks if URL is in the routeResponseMap object
  if (routeResponseMap[req.url]) {
    setTimeout(() => {
      res.end(routeResponseMap[req.url]);
    }, 2000);
  } else {
    res.end("<h1>Welcome!</h1>");
  }
});
app.listen(port);
console.log(`The server has started and is listening on port number:
 ${port}`);
