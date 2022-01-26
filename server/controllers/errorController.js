"use strict";



module.exports = {

    // Not used - boilerplate for custom error page
    pageNotFoundError: (req, res) => {
        let errorCode = 404;
        res.status(errorCode);
        res.render("error");
    },
    
    internalServerError: (error, req, res, next) => {
        let errorCode = 500;
        res.status(errorCode);
        res.send(`${errorCode}, Sorry! Something went wrong with your application :/`);
        console.error(error.stack);
    },

    // Convert response w/ errors to json - generalized for any JSON response
    // Handle different error types
    errorJSON: (error, req, res, next) => {
        console.log('errorJSON: ' + error);
        let errorObject;
        if (error) {
          errorObject = {
            error: {
                status: error.status || 500,
                message: error.message
            }
          };
        } else {
          errorObject = {
            error: {
                status: 500,
                message: "Unknown Error."
            }
          };
        }
        res.json(errorObject);
    }


}