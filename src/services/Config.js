import Service from './Default'

class Config extends Service {
    constructor () {
        super({
            entity: 'Config',
        })
    }

    read () {
        return this.list()
    }
}

export default new Config()