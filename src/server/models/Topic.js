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

    async listIdent (_id) {
        const childrens = await this.readChildrens(_id)

        return promiseLoopArray(childrens, async data => {
            const childrens = await this.listIdent(data.id)

            return {
                ...data,
                childrens,
            }
        })
    }

    read (_id) {
        const sql = `SELECT * FROM ${this.table} WHERE id = ${_id}`

        return Db.conn.query(sql)
    }

    readFirst () {
        const sql = `SELECT * FROM ${this.table} WHERE sequence = 1 AND parent IS NULL`

        return Db.conn.query(sql)
    }

    readBySequence (_sequence, _parent) {
        const parent = _parent ? `= ${_parent}` : 'IS NULL'
        const sql = `
                SELECT
                    *
                FROM
                    ${this.table}
                WHERE
                    sequence = ${_sequence} AND
                    parent ${parent}
            `

        return Db.conn.query(sql)
    }

    readChildrens (_id) {
        const parent = !_id ? 'IS NULL' : `= ${_id}`
        const sql = `
            SELECT * FROM ${this.table} WHERE parent ${parent} ORDER BY sequence ASC
        `

        return Db.conn.query(sql)
    }

    async readFirstChildren (_id) {
        const childrens = await this.readChildrens(_id)

        return childrens[0] ? [ childrens[0], ] : []
    }

    async readLastChildren (_id) {
        const childrens = await this.readChildrens(_id).reverse()

        return childrens[0] ? [ childrens[0], ] : []
    }

    preview (_id) {
        return Promise.resolve({})
    }

    async next (_id) {
        const getNext = async _id => {
            const data = await this.read(_id)

            if (data.length === 0) {
                return Promise.resolve([])
            }

            const next = await this.readBySequence(data[0].sequence + 1, data[0].parent)

            if (next.length > 0) {
                return Promise.resolve(next)
            }

            return getNext(data[0].parent)

        }

        const childrens = await this.readFirstChildren(_id)

        if (childrens.length > 0) {
            return Promise.resolve(childrens)
        }

        return getNext(_id)
    }

}

module.exports = new Topic()