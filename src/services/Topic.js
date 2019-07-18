import Service from './Default'

class Topic extends Service {
    constructor () {
        super({
            entity: 'Topic',
        })
    }

    readFirst () {
        return this.Http.get(`${this.entity}/readFirst`).then(response => {
            return response.data
        })
    }

    next (_id) {
        return this.Http.get(`${this.entity}/next/${_id}`).then(response => {
            return response.data
        })
    }

    preview (_id) {
        return this.Http.get(`${this.entity}/preview/${_id}`).then(response => {
            return response.data
        })
    }
}

export default new Topic()