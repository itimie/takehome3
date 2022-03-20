/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as dataAccessObject from './dataAccessObject';
import * as Comment from './comment';
import * as cors from 'cors';

const app = express();
const db = new dataAccessObject('./database.sqlite3');
const comment = new Comment(db);

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

comment.createTable().catch(error => {
  console.log(`Error: ${JSON.stringify(error)}`);
});

app.post('/createComment', function(request, response) {
  const { body } = request;
  comment.createComment(body).then(result => {
    response.send(result);
  });
});

app.get('/getComment', function(request, response) {
  const { body } = request;
  const { id } = body;
  comment.getComment(id).then(result => {
    response.send(result);
  });
});

app.get('/getComments', function(request, response) {
  comment.getComments().then(result => {
    response.send(result);
  });
});

app.delete('/deleteComments', function(request, response) {
  comment.deleteComments().then(result => {
    response.send(result);
  });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
// app.get('/', function(request, response) {
//   const rootDir = __dirname.replace('/server', '');
//   response.sendFile(`${rootDir}/src/app.html`);
// });

server.on('error', console.error);
