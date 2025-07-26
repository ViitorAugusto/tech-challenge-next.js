const jsonServer = require('json-server'); 
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const dotenv = require('dotenv');

dotenv.config(); 

const port = process.env.PORT || 3001;

server.use(middlewares);
server.use(router);
server.listen(port, () => {
  console.log(`JSON Server está rodando na porta ${port}`);
  console.log(`Acesse: http://localhost:${port}/users`);
});