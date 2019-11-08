import React from 'react'
import objectMap from 'object-map'

export default class Component extends React.Component {
    constructor (_params) {
        super()

        this.state = _params.state || {}

        mountMethods({ ..._params.methods, ..._params.events, }, this)
    }

    componentWillReceiveProps (_props) {
        const props = Object.keys(this.state)

        objectMap(_props, (v, k) => {
            if (props.indexOf(k) === -1) return

            const state = {}

            state[k] = v

            this.setState(state)
        })
    }
}

function mountMethods (_methods, _scope) {
    objectMap(_methods, (method, name) => {
        _scope[name] = method.bind(_scope)
    })
}