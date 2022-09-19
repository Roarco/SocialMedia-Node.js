const chalk = require('chalk');

exports.success = (req, res, message, status, data) => {
    res.status(status || 200).send({
        error: null,
        message,
        data,
    });
}

exports.error = (req, res, message, status,details) => {
    if(details){
        console.log(
            chalk.bgRed.black.bold('[Internal Error]'),
            chalk.red(details)
        );
    }
    res.status(status || 500).send({
        error: message,
        message: null,
    });
}