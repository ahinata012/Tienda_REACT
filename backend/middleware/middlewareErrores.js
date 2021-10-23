const noEncontrado = (req, res, next) => {
  const error = new Error(`No se encontro - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const manejadorErrores = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "desarrollo" ? null : err.stack,
  });
};

export { noEncontrado, manejadorErrores };
