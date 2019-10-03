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

    _server.get(`/${Model.entity}/logout/:id`, (req, res) => {
        Model.logout(req.params.id).then(response => {
            res.json({ message: 'Success', })
        })
    })
}