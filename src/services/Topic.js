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
}

export default new Topic()