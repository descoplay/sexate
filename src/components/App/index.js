import React from 'react'
import './style.scss'

import { Layout, } from 'element-react'

import Side from './components/Side'
import Content from './components/Content'
import Paginate from './components/Paginate'
import SearchResults from './components/SearchResults'

import TopicService from '@/services/Topic'

export default class App extends React.Component {
    constructor () {
        super()

        this.state = {
            topic: {},
            searchResults: [],
            logged: false,
            newTopic: false,
        }

        this.router()

        this.changeTopic = this.changeTopic.bind(this)
        this.onSearch = this.onSearch.bind(this)
        this.onToogleAuth = this.onToogleAuth.bind(this)
        this.newTopic = this.newTopic.bind(this)
    }

    router () {
        const route = window.location.pathname

        if (route === '/') {
            this.fetchFirstTopic()
        }
        else {
            const id = parseInt(route.replace('/', ''))

            TopicService.read(id).then(response => {
                this.changeTopic(response[0], true)
            })
        }

        window.onpopstate = e => {
            this.router()
        }
    }

    fetchFirstTopic () {
        TopicService.readFirst().then(response => {
            this.setState({
                topic: response[0],
            })
        })
    }

    changeTopic (_topic, _pushIgnore = false) {
        const oldUrl = window.location.pathname
        const newUrl = `/${_topic.id}`

        this.setState({
            topic: _topic,
            searchResults: [],
            newTopic: false,
        })

        if (_pushIgnore) return

        window.history.pushState(oldUrl, null, newUrl)
    }

    newTopic () {
        this.setState({ newTopic: true, })
    }

    onSearch (_topics) {
        this.setState({
            searchResults: _topics,
        })
    }

    onToogleAuth (_logged) {
        this.setState({ logged: _logged, })
    }

    render () {
        let content

        if (this.state.searchResults.length === 0) {
            content = (
                <Content
                    topic={this.state.topic}
                    logged={this.state.logged}
                    newTopic={this.state.newTopic}
                />
            )
        }
        else {
            content = <SearchResults
                topics={this.state.searchResults}
                onSelect={this.changeTopic}
            />
        }

        return (
            <Layout.Row className="App">
                <Layout.Col span="4" className="SideArea">
                    <Side
                        onTopicClick={this.changeTopic}
                        onSearch={this.onSearch}
                        onToogleAuth={this.onToogleAuth}
                        onNewTopic={this.newTopic}
                    />
                </Layout.Col>
                <Layout.Col span="20" className="ContentArea">
                    <div className="TopicArea">
                        {content}
                    </div>
                    <div className="PaginateArea">
                        <Paginate topic={this.state.topic} onChangeTopic={this.changeTopic}/>
                    </div>
                </Layout.Col>
            </Layout.Row>
        )
    }
}