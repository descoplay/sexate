const Db = require('../Db')
const promiseLoopArray = require('@desco/promise-loop-array')

class Topic {
    constructor () {
        this.entity = 'Topic'
        this.table = 'topics'
    }

    list (_options) {
        let where = ''

        if (_options.query) {
            where = `WHERE title LIKE "%${_options.query}%" OR content LIKE "%${_options.query}%"`
        }

        const sql = `
            SELECT
                *
            FROM
                ${this.table}
            ${where}
            `

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
        const childrens = (await this.readChildrens(_id)).reverse()

        return childrens[0] ? [ childrens[0], ] : []
    }

    async preview (_id) {
        const currentTopic = await this.read(_id)

        const previewSequence = currentTopic[0].sequence - 1
        const previewParent = currentTopic[0].parent

        if (previewSequence >= 1) {
            const previewTopic = await this.readBySequence(previewSequence, previewParent)
            const lastChildOfPrevTopic = await this.readLastChildren(previewTopic[0].id)

            return Promise.resolve(
                lastChildOfPrevTopic.length > 0 ? lastChildOfPrevTopic : previewTopic
            )
        }
        else {
            return this.read(currentTopic[0].parent)
        }
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

    save (_record) {
        if (_record.id) return this.update(_record)

        return this.create(_record)
    }

    create (_record) {
        const sql = `
            INSERT INTO
                ${this.table}
            (
                title,
                content,
                icon,
                sequence
            )
            VALUES
            (
                "${_record.title}",
                "${_record.content}",
                "${_record.icon}",
                ${_record.sequence}
            )
        `

        return Db.conn.query(sql).then(response => {
            return Promise.resolve({
                id: response.insertId,
                ..._record,
            })
        })
    }

    update (_record) {
        const sql = `
            UPDATE
                ${this.table}
            SET
                title = "${_record.title}",
                content = "${_record.content}",
                icon = "${_record.icon}",
                sequence = ${_record.sequence}
            WHERE
                id = ${_record.id}
        `

        return Db.conn.query(sql).then(() => _record)
    }

    delete (_id) {
        const sql = `DELETE FROM ${this.table} WHERE id = ${_id}`

        return Db.conn.query(sql)
    }

    nextAvailableSequence () {
        const sql = `SELECT sequence FROM ${this.table} ORDER BY sequence DESC LIMIT 1`

        return Db.conn.query(sql).then(response => {
            response[0].sequence++

            return response
        })
    }

}

module.exports = new Topic()