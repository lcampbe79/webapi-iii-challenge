const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');

const userRouter = require('./users/userRouter')

const server = express();


//custom middleware
server.use(helmet());
server.use(express.json());
server.use(morgan('dev'));

server.use('/api/users', logger('Logger for users: '), userRouter);

function logger(prefix) {
  return (req, res, next) => {
    console.log(
      `${prefix} [${new Date().toISOString()}] ${req.method} to ${req.url}`
    );

    next();
  };
}

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

module.exports = server;
