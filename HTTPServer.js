const http = require('http'),
      fs = require('fs');

const hostname = '0.0.0.0'
const port = 5000 && process.env.PORT



const server = http.createServer((req, res) => {
   fs.readFile("console.html", function(error, data) {  
                if (error) {  
                    res.writeHead(404);  
                    res.write(error);  
                    res.end();  
                } else {  
                    res.writeHead(200, {  
                        'Content-Type': 'text/html'  
                    });  
                    res.write(data);  
                    res.end();  
                }  
   });
})
server.listen(port, hostname, () => {
      console.log(`Server running at http://${hostname}:${port}/`)
});
