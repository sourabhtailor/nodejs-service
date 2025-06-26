const http = require('http');
const auth = require('basic-auth');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const PORT = 3000;

const requestHandler = (req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello, world! chnaged');
  } else if (req.url === '/secret' && req.method === 'GET') {
    const credentials = auth(req);

    const validUser = process.env.USERNAME;
    const validPass = process.env.PASSWORD;
    const secretMessage = process.env.SECRET_MESSAGE;

    if (!credentials || credentials.name !== validUser || credentials.pass !== validPass) {
      res.writeHead(401, { 'WWW-Authenticate': 'Basic realm="Secure Area"' });
      res.end('Access denied');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('This is a secret!');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
};

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`Server running at http://101.53.150.196:${PORT}`);
});
