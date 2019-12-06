const Model = require('../models/Topic')

module.exports = _server => {
    _server.get(`/${Model.entity}`, (req, res) => {
        Model.list({ query: req.query.query, }).then(response => {
            res.json(response)
        })
    })

    _server.get(`/${Model.entity}/listIdent`, (req, res) => {
        Model.listIdent().then(response => {
            res.json(response)
        })
    })

    _server.get(`/${Model.entity}/read/:id`, (req, res) => {
        Model.read(req.params.id).then(response => {
            res.json(response)
        })
    })

    _server.get(`/${Model.entity}/readFirst`, (req, res) => {
        Model.readFirst().then(response => {
            res.json(response)
        })
    })

    _server.get(`/${Model.entity}/preview/:id`, (req, res) => {
        Model.preview(req.params.id).then(response => {
            res.json(response)
        })
    })

    _server.get(`/${Model.entity}/next/:id`, (req, res) => {
        Model.next(req.params.id).then(response => {
            res.json(response)
        })
    })

    _server.post(`/${Model.entity}/save`, (req, res) => {
        Model.save(req.body).then(response => {
            res.json(response)
        })
    })

    _server.put(`/${Model.entity}/save`, (req, res) => {
        Model.save(req.body).then(response => {
            res.json(response)
        })
    })

    _server.delete(`/${Model.entity}/delete/:id`, (req, res) => {
        Model.delete(req.params.id).then(response => {
            res.json(response)
        })
    })
}