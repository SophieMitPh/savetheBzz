const fs = require ("fs"),
httpStatus = require("http-status-codes"),
contentTypes = requre ("./contentTypes")

module.exports = {
    getFile: (file, res) => {
        fs.readFile(`./${file}`, (error, data) => {
            if(error) {
                res.writeHead(httpStatus.INTERNAL_SERVER_ERROR, contentTypes.html)
                res.end("Internal server error.")
            }
            res.data(data)
        })
    }
}