const fetch = require('node-fetch');

const documentationController = {
    docs: (req, res) => {
        //Documentación en Postman
        res.redirect('https://documenter.getpostman.com/view/18268919/UyrGCExf');

    }
}


module.exports = documentationController;
