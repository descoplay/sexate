import React from 'react'
import { Input, Dialog, Button, Layout, MessageBox, } from 'element-react'
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome'
import { faLock, faLockOpen, } from '@fortawesome/free-solid-svg-icons'

import AuthService from '@/services/Auth'

import Component from '@/components'

import './style.scss'

export default class Auth extends Component {
    constructor (_props) {
        super({
            state: {
                ifLogged: false,
                visible: false,
                user: '',
                password: '',
            },
            methods: {
                toogleVisible () {
                    this.setState({
                        visible: !this.state.visible,
                    })
                },
                login () {
                    AuthService.login(this.state.user, this.state.password)
                        .then(response => {
                            this.setLogged(true)
                            this.toogleVisible()
                        })
                        .catch(e => {
                            const content = 'Verifique os dados e tente novamente.'
                            const title = 'Dados inválidos'

                            MessageBox.alert(content, title, { confirmButtonText: 'OK', })
                        })
                },
                logout () {
                    AuthService.logout()
                        .then(() => {
                            this.setLogged(false)
                        })
                        .catch(e => {
                            const content = 'Ocorreu um erro, por favor tente novamente mais tarde.'
                            const title = 'Ops!'

                            MessageBox.alert(content, title, { confirmButtonText: 'OK', })
                        })
                },
                setLogged (_logged) {
                    this.setState({ ifLogged: _logged, })
                    this.toogle(_logged)
                },
                onChangeValue (_value, _field) {
                    const state = {}

                    state[_field] = _value

                    this.setState(state)
                },
            },
            events: {
                toogle: _props.toogle || function () {},
            },
        })
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
                                    type="password"
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