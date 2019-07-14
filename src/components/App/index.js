import React from 'react'
import './style.scss'

import { Layout, } from 'element-react'

import Side from './components/Side'
import Content from './components/Content'
import Paginate from './components/Paginate'

import TopicService from '../../services/Topic'

export default class App extends React.Component {
    constructor () {
        super()

        this.state = {
            topic: {},
        }

        this.fetchFirstTopic()
    }

    fetchFirstTopic () {
        TopicService.readFirst().then(response => {
            this.setState({
                topic: response[0],
            })
        })
    }

    render () {
        return (
            <div className="App">
                <Layout.Row>
                    <Layout.Col span="4">
                        <Side />
                    </Layout.Col>
                    <Layout.Col span="20">
                        <Content topic={this.state.topic} />
                        <Paginate />
                    </Layout.Col>
                </Layout.Row>
            </div>
        )
    }
}