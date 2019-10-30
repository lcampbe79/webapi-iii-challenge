module.exports = logger;

function logger(prefix) {
  return (req, res, next) => {
    console.log(
      `${prefix} [${new Date().toISOString()}] ${req.method} to ${req.url}`
    );

    next();
  };
}