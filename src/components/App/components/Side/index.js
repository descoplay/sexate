import React from 'react'
import { Menu, Input, } from 'element-react'

import ConfigService from '@/services/Config'
import TopicService from '@/services/Topic'

import Topics from './components/Topics'

import './style.scss'

export default class Side extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            topics: [],
            configs: {},
            query: '',
        }

        this.fetchTopics()
        this.fetchConfigs()

        this.onTopicClick = props.onTopicClick
        this.onSearch = props.onSearch

        this._onTopicClick = this._onTopicClick.bind(this)
        this._onSearch = this._onSearch.bind(this)
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

    render () {
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
                <Topics topics={this.state.topics}/>
            </Menu>
        )
    }
}