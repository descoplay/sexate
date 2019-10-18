import React from 'react'
import { Input, Dialog, Button, Layout, } from 'element-react'
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen, } from '@fortawesome/free-solid-svg-icons'

import './style.scss'

export default class Auth extends React.Component {
    constructor () {
        super()

        this.state = {
            ifLogged: false,
            visible: false,
        }

        this.toogleVisible = this.toogleVisible.bind(this)
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.onChangeValue = this.onChangeValue.bind(this)
    }

    toogleVisible () {
        this.setState({
            visible: !this.state.visible,
        })
    }

    login () {
        this.setState({ ifLogged: true, })
        this.toogleVisible()
    }

    logout () {
        this.setState({ ifLogged: false, })
    }

    onChangeValue (_value, _field) {
        const state = {}

        state[_field] = _value

        this.setState(state)
    }

    render () {
        let authIcon

        if (this.state.ifLogged) {
            authIcon = <FontAwesomeIcon icon={faLockOpen} onClick={this.logout} />
        }
        else {
            authIcon = <FontAwesomeIcon icon={faLock} onClick={this.toogleVisible} />
        }

        return (
            <div className="authArea">
                {authIcon}
                <Dialog
                    title="Autenticação"
                    size="tiny"
                    visible={this.state.visible}
                    onCancel={this.toogleVisible}
                    lockScroll={false}
                >
                    <Dialog.Body>
                        <Layout.Row>
                            <Layout.Col span="12">
                                <Input
                                    className="authUserField"
                                    placeholder="Usuário"
                                    value={this.state.user}
                                    onChange={v => { this.onChangeValue(v, 'user') }}
                                />
                            </Layout.Col>
                            <Layout.Col span="12">
                                <Input
                                    className="authPasswordField"
                                    placeholder="Senha"
                                    value={this.state.password}
                                    onChange={v => { this.onChangeValue(v, 'password') }}
                                />
                            </Layout.Col>
                        </Layout.Row>
                    </Dialog.Body>
                    <Dialog.Footer className="dialog-footer">
                        <Button onClick={this.toogleVisible}>Cancelar</Button>
                        <Button type="primary" onClick={this.login}>Autenticar</Button>
                    </Dialog.Footer>
                </Dialog>
            </div>
        )
    }
}