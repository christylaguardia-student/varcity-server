// eslint-disable-next-line
function getErrorHandler(log=console.log) {

  // eslint-disable-next-line
  return function errorHandler(err, req, res, next) {
    let error = {code: '', name: ''};
    console.log(45, err)
    if (err.name === 'ValidationError') {
      error.code = 400;
      const { errors } = err;
      console.log(800, errors)
      error.name = Object.keys(errors).map(key => errors[key].name);
      log(error);
    }
    else if (err.name === 'CastError') {
      error.code = 400;
      error.name = err.error;
      log(error);
    }
    else if (err.name == 'Both email and password are required.') {
      error.code = err.code,
      error.name = err.name;
      log(error);
    }
    else if (err.code) {
      error.code = err.code;
      error.name = err.error;
      log(error);
    }
    else {
      error.code = 500;
      error.name = 'Internal Server Error';
      log(error);
    }
    res.send(error);
  };
}

module.exports = getErrorHandler;
