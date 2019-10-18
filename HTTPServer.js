const http = require('http'),
      fs = require('fs');

const hostname = '0.0.0.0'
const port = 5000 && process.env.PORT



fs.readFile('./console.html', function (err, html) {
    if (err) {
        throw err; 
    } 

const server = http.createServer((req, res) => {
   fs.readFile('./console.html', function (err, html) {
    if (err) {
        throw err; 
    } 
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html');
  res.write(html);
  res.end();
   }
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
