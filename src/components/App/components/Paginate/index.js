import React from 'react'
import { Layout, Button, } from 'element-react'

import Component from '@/components'

import TopicService from '@/services/Topic'

import './style.scss'

export default class Paginate extends Component {
    constructor (_props) {
        super({
            state: {
                topic: _props.topic,
            },
            methods: {
                preview () {
                    TopicService.preview(this.state.topic.id).then(response => {
                        this.changeCurrentTopic(response[0])
                    })
                },
                next () {
                    TopicService.next(this.state.topic.id).then(response => {
                        this.changeCurrentTopic(response[0])
                    })
                },
            },
            events: {
                changeCurrentTopic: _props.onChangeTopic,
            },
        })
    }

    render () {
        return (
            <div className="Paginate">
                <Layout.Row className="padding">
                    <Layout.Col span="12" className="preview">
                        <Button onClick={this.preview}>
                            <i className="el-icon-upload el-icon-right"></i>
                            Anterior
                        </Button>
                    </Layout.Col>
                    <Layout.Col span="12" className="next">
                        <Button onClick={this.next}>
                            Seguinte
                            <i className="el-icon-upload el-icon-right"></i>
                        </Button>
                    </Layout.Col>
                </Layout.Row>
            </div>
        )
    }
}