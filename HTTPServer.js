const http = require('http')

const hostname = '0.0.0.0'
const port = 5000 && process.env.PORT
var xd = require('./console.html');

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html');
  res.write(xd);
  res.end();
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`)
})
