const AuthModel = require('./models/Auth')
const publicRoutes = require('./publicRoutes')

module.exports = async (_req, _res, _next) => {
    const url = _req.url

    if (publicRoutes[url]) {
        _next()

        return
    }

    const tokenValid = await AuthModel.tokenIsValid(_req.headers)

    if (tokenValid) {
        _next()
    }
    else {
        _res.status(401)
        _res.json({ message: 'Token invalid', })
    }
}