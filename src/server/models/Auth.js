const jwt = require('jsonwebtoken')

const Db = require('../Db')

const secret = require('../secret')

class Auth {
    constructor () {
        this.entity = 'Auth'
        this.table = 'auths'
    }

    async login (_login, _password ) {
        const login = `"${_login}"`
        const password = `"${_password}"`
        const sql = `
            SELECT id FROM ${this.table} WHERE login = ${login} AND password = ${password}
        `

        const user = (await Db.conn.query(sql))[0]

        if (!user) {
            return Promise.reject({
                message: 'Invalid Access Data',
            })
        }

        return this.generateToken(user).then(token => {
            return Promise.resolve({ ...token, userId: user.id, })
        })
    }

    logout (_token) {
        const data = this.decryptToken(_token)

        return this.setToken(data.id, '')
    }

    decryptToken (_token) {
        try {
            return jwt.verify(_token, secret)
        }
        catch (e) {
            return false
        }
    }

    setToken (_id, _token) {
        const sql = `UPDATE ${this.table} SET token = "${_token}" WHERE id = ${_id}`

        return Db.conn.query(sql)
    }

    generateToken (_user) {
        const token = jwt.sign({ id: _user.id, }, secret, { expiresIn: '30m', })

        return this.setToken(_user.id, token).then(() => {
            return Promise.resolve({ token, })
        })
    }

    async tokenIsValid (_data) {
        if (!_data || !_data.token || !_data.id) return false

        if (!this.decryptToken(_data.token)) return false

        const token = _data.token
        const userId = _data.id
        const sql = `SELECT id FROM ${this.table} WHERE id = ${userId} AND token = '${token}'`
        const user = (await Db.conn.query(sql))[0]

        return !!user
    }
}

module.exports = new Auth()