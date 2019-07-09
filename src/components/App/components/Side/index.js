import React from 'react'
import { Menu, Input, } from 'element-react'

import TopicService from '../../../../services/Topic.js'

import renderTopicsMenu from './methods/renderTopicsMenu'

import './style.scss'

export default class Side extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            topics: [],
        }

        this.fetchTopics()
    }

    fetchTopics () {
        TopicService.listIdent().then(response => {
            this.setState({
                topics: response,
            })
        })
    }

    render () {
        return (
            <Menu defaultActive="2" className="Side">
                <label className="title">Nome Sistema</label>
                <Input
                    icon="search"
                    placeholder="Busque aqui"
                    onIconClick={this.onSearch.bind(this)}
                />
                {renderTopicsMenu(this.state.topics)}
            </Menu>
        )
    }

    onSearch () {
        alert('Busca a ser implementada')
    }
}