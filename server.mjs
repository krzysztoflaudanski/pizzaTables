import jsonServer from 'json-server';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router('build/db/app.json');
const middlewares = jsonServer.defaults({
  static: 'build',
  noCors: true
});

const port = process.env.PORT || 3131;
server.use(middlewares);
server.use('/api', router);
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

server.listen(port);