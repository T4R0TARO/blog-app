const { CustomAPIError } = require("../errors");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(400).json({ err });
};

// const errorHandlerMiddleware = (err, req, res, next) => {
//   let customError = {
//     statusCode: err.statusCode || 400,
//     msg: err.message || "Something went wrong, try again later...",
//   };

//   return res.status(customError.statusCode).json({ msg: customError.msg });
// };

module.exports = errorHandlerMiddleware;
