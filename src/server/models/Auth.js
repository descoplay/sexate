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
        const sqlSelect = `
            SELECT id FROM ${this.table} WHERE login = ${login} AND password = ${password}
        `

        const user = (await Db.conn.query(sqlSelect))[0]

        if (!user) {
            return Promise.reject({
                message: 'Invalid Access Data',
            })
        }

        const token = jwt.sign({ id: user.id, }, secret, { expiresIn: 30 * 60, })

        const sqlUpdate = `UPDATE ${this.table} SET token = "${token}" WHERE id = ${user.id}`

        return Db.conn.query(sqlUpdate).then(() => {
            return Promise.resolve({ userId: user.id, token, })
        })
    }
}

module.exports = new Auth()