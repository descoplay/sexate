const db = require('promise-mysql')

class Db {
    constructor () {
        this.config = {
            user: 'root',
            password: '12345678',
            database: 'sexate',
        }
    }
    connect () {
        return db.createConnection(this.config).then(conn => {
            this.conn = conn
        })
    }
}

module.exports = new Db()