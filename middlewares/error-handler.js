// backend/middlewares/error-handler.js
module.exports = (err, req, res, next) => {
  // Log full error (useful during development)
  console.error(err);

  // If an error object has a statusCode, use it; otherwise 500
  const status = err.statusCode || 500;

  // For unexpected server errors avoid leaking details to clients
  const message =
    status === 500 ? "An internal server error has occurred" : err.message;

  res.status(status).send({ message });
};
