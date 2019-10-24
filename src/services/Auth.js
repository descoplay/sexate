import Service from './Default'

class Auth extends Service {
    constructor () {
        super({
            entity: 'Auth',
        })
    }

    login (_user, _password) {
        const params = { login: _user, password: _password, }

        return this.Http.post(`${this.entity}/login`, params).then(response => {
            this.setToken(response.data)

            return Promise.resolve(response.data)
        })
    }

    logout () {
        return this.Http.get(`${this.entity}/logout`).then(() => {
            this.unsetToken()

            return Promise.resolve()
        })
    }

    setToken ({ token, userId, }) {
        this.Http.defaults.headers.common.token = token
        this.Http.defaults.headers.common.id = userId
    }

    unsetToken () {
        delete this.Http.defaults.headers.common.token
        delete this.Http.defaults.headers.common.id
    }
}

export default new Auth()