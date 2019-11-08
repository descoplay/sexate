import React from 'react'
import { Menu, Input, Button, } from 'element-react'

import ConfigService from '@/services/Config'
import TopicService from '@/services/Topic'

import Component from '@/components'

import Auth from './components/Auth'
import Topics from './components/Topics'

import './style.scss'

export default class Side extends Component {
    constructor (_props) {
        super({
            state: {
                topics: [],
                configs: {},
                query: '',
                logged: false,
            },
            methods: {
                _onTopicClick (_topicId) {
                    return TopicService.read(_topicId).then(response => {
                        this.onTopicClick(response[0])
                    })
                },
                _onSearch () {
                    TopicService.list({ query: this.state.query, }).then(response => {
                        this.onSearch(response)
                    })
                },
                _onToogleAuth (_logged) {
                    this.setState({ logged: _logged, })

                    this.onToogleAuth(_logged)
                },
                onChangeQuery (_query) {
                    this.setState({
                        query: _query,
                    })
                },
                fetchConfigs () {
                    ConfigService.read().then(response => {
                        this.setState({
                            configs: response[0],
                        })
                    })
                },
                fetchTopics () {
                    TopicService.listIdent().then(response => {
                        this.setState({
                            topics: response,
                        })
                    })
                },
            },
            events: {
                onTopicClick: _props.onTopicClick,
                onSearch: _props.onSearch,
                onToogleAuth: _props.onToogleAuth,
                newTopic: _props.onNewTopic,
            },
        })

        this.fetchTopics()
        this.fetchConfigs()
    }

    render () {
        let newTopicBtn = ''

        if (this.state.logged) {
            newTopicBtn = (
                <Button className="newTopicBtn" onClick={this.newTopic}>Novo Tópico</Button>
            )
        }

        return (
            <Menu defaultActive="2" className="Side" onSelect={this._onTopicClick}>
                <label className="title">{this.state.configs.project_name}</label>
                <Input
                    icon="search"
                    placeholder="Busque aqui"
                    value={this.state.query}
                    onChange={this.onChangeQuery}
                    onIconClick={this._onSearch}
                />
                {newTopicBtn}
                <Topics topics={this.state.topics}/>
                <Auth toogle={this._onToogleAuth} />
            </Menu>
        )
    }
}