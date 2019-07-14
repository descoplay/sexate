const Db = require('../Db')
const promiseLoopArray = require('@desco/promise-loop-array')

class Topic {
    constructor () {
        this.entity = 'Topic'
        this.table = 'topics'
    }

    list () {
        const sql = `SELECT * FROM ${this.table}`

        return Db.conn.query(sql)
    }

    listIdent (_id) {
        let sql = `SELECT * FROM ${this.table} WHERE parent `

        if (!_id) {
            sql += 'IS NULL'
        }
        else {
            sql += `= ${_id}`
        }

        return Db.conn.query(sql).then(response => {
            return promiseLoopArray(response, data => {
                return this.listIdent(data.id).then(childrens => {
                    return {
                        ...data,
                        childrens,
                    }
                })
            })
        })
    }

    readFirst () {
        const sql = `SELECT * FROM ${this.table} WHERE sequence = 1 AND parent IS NULL`

        return Db.conn.query(sql)
    }

}

module.exports = new Topic()