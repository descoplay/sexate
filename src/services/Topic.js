import Service from './Default'

class Topic extends Service {
    constructor () {
        super({
            entity: 'Topic',
        })
    }

    read (_id) {
        return this.Http.get(`${this.entity}/read/${_id}`).then(response => {
            return response.data
        })
    }

    save (_topic) {
        if (_topic.id) return this.update(_topic)

        return this.create(_topic)
    }

    update (_topic) {
        return this.Http.put(`${this.entity}/update`, _topic).then(response => {
            return response.data
        })
    }

    create (_topic) {
        return this.Http.post(`${this.entity}/create`, _topic).then(response => {
            return response.data
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