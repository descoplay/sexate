const AuthModel = require('./models/Auth')
const publicRoutes = require('./publicRoutes')

module.exports = async (_req, _res, _next) => {
    if (ifPublicRoute(_req.url)) {
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

function ifPublicRoute (_url) {
    if (publicRoutes[_url] === true) return true
    if (publicRoutes[_url] === false) return false

    const routes = Object.keys(publicRoutes)

    for (let c = 0, max = routes.length; c < max; c++) {
        const route = routes[c]

        if (compareRoutes(route, _url)) return publicRoutes[route] === true
    }

    return true
}

function compareRoutes (_route1, _route2) {
    const route1 = `${_route1}/`.replace('//', '/').split('/')
    const route2 = `${_route2}/`.replace('//', '/').split('/')

    if (route1.length !== route2.length) return false

    for (let c = 0, max = route1.length; c < max; c++) {
        if (route1[c].indexOf(':') !== -1) continue
        if (route1[c] !== route2[c]) return false
    }

    return true
}