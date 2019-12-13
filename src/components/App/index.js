import React from 'react'
import './style.scss'

import { Layout, MessageBox, } from 'element-react'

import Component from '@/components'

import Side from './components/Side'
import Content from './components/Content'
import Paginate from './components/Paginate'
import SearchResults from './components/SearchResults'

import TopicService from '@/services/Topic'

export default class App extends Component {
    constructor () {
        super({
            state: {
                topics: [],
                topic: {},
                searchResults: [],
                logged: false,
                newTopic: false,
            },
            methods: {
                changeTopic (_topic, _pushIgnore = false) {
                    const oldUrl = window.location.pathname
                    const newUrl = `/${_topic.id}`

                    this.setState({
                        topic: _topic,
                        searchResults: [],
                    })

                    if (_pushIgnore) return

                    window.history.pushState(oldUrl, null, newUrl)
                },
                newTopic () {
                    this.setState({ topic: {}, })
                },
                onSearch (_topics) {
                    this.setState({
                        searchResults: _topics,
                    })
                },
                onToogleAuth (_logged) {
                    this.setState({ logged: _logged, })
                },
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
                },
                fetchFirstTopic () {
                    TopicService.readFirst().then(response => {
                        this.setState({
                            topic: response[0],
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
                onSaveTopic (_topic) {
                    TopicService.save(_topic).then(response => {
                        const content = 'Tópico salvo'
                        const title = 'Sucesso'

                        MessageBox.alert(content, title, { confirmButtonText: 'OK', })

                        this.setState({ topic: response, })

                        this.fetchTopics()
                    }).catch (() => {
                        this.fetchTopics()
                    })
                },
                onDeleteTopic (_id) {
                    TopicService.delete(_id).then(() => {
                        const content = 'Tópico removido'
                        const title = 'Sucesso'

                        MessageBox.alert(content, title, { confirmButtonText: 'OK', })

                        this.fetchTopics()
                    })
                },
            },
        })

        this.fetchTopics()
        this.router()
    }

    render () {
        let content

        if (this.state.searchResults.length === 0) {
            content = (
                <Content
                    topic={this.state.topic}
                    logged={this.state.logged}
                    onDelete={this.onDeleteTopic}
                    onSave={this.onSaveTopic}
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
                        topics={this.state.topics}
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