import Axios from 'axios'

const Http = Axios.create()

Http.defaults.baseURL = 'http://localhost:3001/'

export default class Service {
    constructor (_params) {
        this.entity = _params.entity
        this.Http = Http
    }

    list (_options = {}) {
        return Http.get(`${this.entity}`, {
            params: {
                query: _options.query,
            },
        }).then(response => {
            return response.data
        })
    }

    listIdent () {
        return Http.get(`${this.entity}/listIdent`).then(response => {
            return response.data
        })
    }
}