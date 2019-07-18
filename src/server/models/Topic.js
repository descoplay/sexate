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
        const where = !_id ? 'IS NULL' : `= ${_id}`
        const sql = `SELECT * FROM ${this.table} WHERE parent ${where} ORDER BY sequence ASC`

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

    preview (_id) {
        return Promise.resolve({})
    }

    next (_id) {
        const getChildrens = () => {
            const sqlChildren = `
                SELECT * FROM ${this.table} WHERE parent = ${_id} ORDER BY sequence ASC LIMIT 1
            `

            return Db.conn.query(sqlChildren).then(response => {
                if (response.length > 0) {
                    return Promise.resolve(response)
                }

                return getNext(_id)
            })
        }

        const getNext = _id => {
            const sqlId = `SELECT sequence, parent FROM ${this.table} WHERE id = ${_id}`

            return Db.conn.query(sqlId).then(response => {
                if (response.length === 0) {
                    return []
                }

                const sequence = response[0].sequence + 1
                const parent = response[0].parent
                const parentWhere = response[0].parent ? `= ${response[0].parent}` : 'IS NULL'

                const sqlNext = `
                    SELECT
                        *
                    FROM
                        ${this.table}
                    WHERE
                        sequence = ${sequence} AND
                        parent ${parentWhere}
                `

                return Db.conn.query(sqlNext).then(response => {
                    if (response.length > 0) {
                        return Promise.resolve(response)
                    }

                    return getNext(parent)

                })
            })
        }

        return getChildrens()
    }

}

module.exports = new Topic()