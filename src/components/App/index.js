import React from 'react'
import './style.scss'

import { Layout, } from 'element-react'

import Side from './components/Side'
import Content from './components/Content'
import Paginate from './components/Paginate'

import TopicService from '@/services/Topic'

export default class App extends React.Component {
    constructor () {
        super()

        this.state = {
            topic: {},
        }

        this.fetchFirstTopic()

        this.changeTopic = this.changeTopic.bind(this)
    }

    fetchFirstTopic () {
        TopicService.readFirst().then(response => {
            this.setState({
                topic: response[0],
            })
        })
    }

    changeTopic (_topic) {
        this.setState({
            topic: _topic,
        })
    }

    render () {
        return (
            <div className="App">
                <Layout.Row>
                    <Layout.Col span="4">
                        <Side onTopicClick={this.changeTopic} />
                    </Layout.Col>
                    <Layout.Col span="20">
                        <Content topic={this.state.topic} />
                        <Paginate topic={this.state.topic} onChangeTopic={this.changeTopic}/>
                    </Layout.Col>
                </Layout.Row>
            </div>
        )
    }
}