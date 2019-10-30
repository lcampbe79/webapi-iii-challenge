const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const userRouter = require('./users/userRouter')

const logger = require('./middleware/logger')

const server = express();


//custom middleware
server.use(helmet());
server.use(express.json());
server.use(morgan('dev'));

server.use('/api/users', logger('Logger for users: '), userRouter);



server.get('/', logger('Logger for initial GET: '), (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

module.exports = server;
