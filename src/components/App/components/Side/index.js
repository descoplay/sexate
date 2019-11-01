import React from 'react'
import { Menu, Input, Button, } from 'element-react'

import ConfigService from '@/services/Config'
import TopicService from '@/services/Topic'

import Auth from './components/Auth'
import Topics from './components/Topics'

import './style.scss'

export default class Side extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            topics: [],
            configs: {},
            query: '',
            logged: false,
        }

        this.fetchTopics()
        this.fetchConfigs()

        this.onTopicClick = props.onTopicClick
        this.onSearch = props.onSearch
        this.onToogleAuth = props.onToogleAuth
        this.newTopic = props.onNewTopic

        this._onTopicClick = this._onTopicClick.bind(this)
        this._onSearch = this._onSearch.bind(this)
        this._onToogleAuth = this._onToogleAuth.bind(this)
        this.onChangeQuery = this.onChangeQuery.bind(this)
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

    _onTopicClick (_topicId) {
        return TopicService.read(_topicId).then(response => {
            this.onTopicClick(response[0])
        })
    }

    _onSearch () {
        TopicService.list({ query: this.state.query, }).then(response => {
            this.onSearch(response)
        })
    }

    onChangeQuery (_query) {
        this.setState({
            query: _query,
        })
    }

    _onToogleAuth (_logged) {
        this.setState({ logged: _logged, })

        this.onToogleAuth(_logged)
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