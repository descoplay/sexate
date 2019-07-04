const Model = require('../models/Topic')

module.exports = _server => {
    _server.get(`/${Model.entity}`, (req, res) => {
        Model.list().then(response => {
            res.json(response)
        })
    })
}