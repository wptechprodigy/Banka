const errorHandler = (err, req, res, next) => {
  if (typeof err === 'string') {
    // custom application error
    return res.status(400).json({
      status: 400,
      message: err,
    });
  }

  if (err.name === 'ValidationError') {
    // validation error
    return res.status(400).json({
      status: 400,
      message: err,
    });
  }

  if (err.name === 'UnauthorizedError') {
    // jwt authentication error
    return res.status(401).json({
      status: 401,
      message: 'Authentication required',
    });
  }

  // default to 500 server error
  return res.status(500).json({
    status: 500,
    message: err.message,
  });
};

export default errorHandler;
