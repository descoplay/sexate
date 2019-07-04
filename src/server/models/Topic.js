const Db = require('../Db')

class Topic {
    constructor () {
        this.entity = 'Topic'
        this.table = 'topics'
    }

    list () {
        const sql = `SELECT * FROM ${this.table}`

        return Db.conn.query(sql)
    }
}

module.exports = new Topic()