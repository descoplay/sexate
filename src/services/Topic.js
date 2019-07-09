import Service from './Default'

class Topic extends Service {
    constructor () {
        super({
            entity: 'Topic',
        })
    }
}

export default new Topic()