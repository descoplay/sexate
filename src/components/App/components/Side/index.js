import React from 'react'
import { Menu, Input, } from 'element-react'

import ConfigService from '@/services/Config'
import TopicService from '@/services/Topic'

import renderTopicsMenu from './methods/renderTopicsMenu'

import './style.scss'

export default class Side extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            topics: [],
            configs: {},
        }

        this.fetchTopics()
        this.fetchConfigs()
    }

    fetchConfigs () {
        ConfigService.read().then(response => {
            this.setState({
                configs: response[0],
            })
        })
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
                <label className="title">{this.state.configs.project_name}</label>
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