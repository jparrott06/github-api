"use strict";



module.exports = {

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