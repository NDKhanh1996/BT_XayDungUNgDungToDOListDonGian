const http = require('http');
const fs = require('fs');
const qs = require('qs');

const sever = http.createServer((req, res) => {
    if (req.method === 'GET'){
        fs.readFile('./todo.html',(err, data) => {
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.write(data);
            return res.end();
        });
    } else {
        let dataString = '';
        req.on('data', (chunk) => {
            dataString += chunk;
        })
        req.on('end', () => {
            const userInfo = qs.parse(dataString)
            fs.readFile('./display.html', 'utf8', (err, data) => {
                if (err){
                    console.log(err)
                }
                data = data.replace('{6h}', userInfo.six)
                data = data.replace('{8h}', userInfo.eight)
                data = data.replace('{12h}', userInfo.twelve)
                res.writeHead(200,{'Content-Type' : 'text/html'})
                res.write(data);
                return res.end();
            })
        })
        req.on('error', () => {
            console.log('error')
        })
    }
})
sever.listen(8080,'localhost',() => {
    console.log('server running at localhost : 8080 ')
})