const Model = require('../models/Auth')

module.exports = _server => {
    _server.post(`/${Model.entity}/login`, (req, res) => {
        Model.login(req.body.login, req.body.password)
            .then(response => {
                res.json(response)
            })
            .catch(error => {
                res.status(401)
                res.json(error)
            })
    })
}