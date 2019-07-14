const Db = require('../Db')

class Config {
    constructor () {
        this.entity = 'Config'
        this.table = 'configs'
    }

    read () {
        const sql = `SELECT * FROM ${this.table}`

        return Db.conn.query(sql)
    }
}

module.exports = new Config()