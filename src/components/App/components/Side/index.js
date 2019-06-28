import React from 'react'
import { Menu, Input, } from 'element-react'

import renderTopicsMenu from './methods/renderTopicsMenu'

import './style.scss'

export default class Side extends React.Component {
    render () {
        return (
            <Menu defaultActive="2" className="Side">
                <label className="title">Nome Sistema</label>
                <Input
                    icon="search"
                    placeholder="Busque aqui"
                    onIconClick={this.onSearch.bind(this)}
                />
                {renderTopicsMenu()}
            </Menu>
        )
    }

    onSearch () {
        alert('Busca a ser implementada')
    }
}