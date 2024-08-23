class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware = (err, req, res, next) => {
  err.message = err.message || "Internal Server Error";
  err.statusCode = err.statusCode || 500;

  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`,
      err = new ErrorHandler(message, 400);
  }
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`,
      err = new ErrorHandler(message, 400);
  }
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again!`;
    err = new ErrorHandler(message, 400);
  }
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is expired, Try again!`;
    err = new ErrorHandler(message, 400);
  }
  return res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
  
};

export default ErrorHandler;


      /// explaination of the code 

      /// error handeler funcion 
      /*Class Declaration: ErrorHandler is a custom error class that extends the built-in Error class in JavaScript.
Constructor: The constructor takes two arguments: message and statusCode.
message: A string describing the error.
statusCode: An HTTP status code that indicates the type of error (e.g., 400 for bad requests, 500 for server errors).
Super Call: super(message) calls the parent class (Error) constructor, setting the error message.
Property Assignment: this.statusCode = statusCode assigns the status code to the error instance.*/ 
  

// error middleware 

/*Function Declaration: errorMiddleware is an Express.js middleware function for handling errors. It takes four arguments:

err: The error object.
req: The request object.
res: The response object.
next: The next middleware function.
Default Error Properties: The function sets default values for the error message and status code if they are not already set:

err.message defaults to "Internal Server Error".
err.statusCode defaults to 500 (Internal Server Error).
Error Handling Conditions:

CastError: If the error's name is "CastError" (typically occurs when an invalid MongoDB ObjectId is used), a new ErrorHandler instance is created with a message indicating that the resource was not found and a 400 status code (Bad Request).
Duplicate Key Error: If the error's code is 11000 (MongoDB duplicate key error), a new ErrorHandler instance is created with a message indicating that a duplicate key was entered and a 400 status code.
JsonWebTokenError: If the error's name is "JsonWebTokenError" (typically occurs when JWT is invalid), a new ErrorHandler instance is created with a message indicating that the JWT is invalid and a 400 status code.
TokenExpiredError: If the error's name is "TokenExpiredError" (typically occurs when JWT is expired), a new ErrorHandler instance is created with a message indicating that the JWT is expired and a 400 status code.*/ 
