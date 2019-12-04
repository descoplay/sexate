const Model = require('../models/Config')

module.exports = _server => {
    _server.get(`/${Model.entity}`, (req, res) => {
        Model.read().then(response => {
            res.json(response)
        })
    })
}