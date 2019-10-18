const http = require('http'),
      fs = require('fs');

const hostname = '0.0.0.0'
const port = 5000 && process.env.PORT



fs.readFile('./console.html', function (err, html) {
    if (err) {
        throw err; 
    } 

const server = http.createServer((req, res) => {
   fs.readFile("console.html", function(error, data) {  
                if (error) {  
                    response.writeHead(404);  
                    response.write(error);  
                    response.end();  
                } else {  
                    response.writeHead(200, {  
                        'Content-Type': 'text/html'  
                    });  
                    response.write(data);  
                    response.end();  
                }  
   }); 
})
server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`)
})
