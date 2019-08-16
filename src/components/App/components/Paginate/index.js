import React from 'react'
import { Layout, Button, } from 'element-react'

import TopicService from '@/services/Topic'

import './style.scss'

export default class Paginate extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            topic: props.topic,
        }

        this.preview = this.preview.bind(this)
        this.next = this.next.bind(this)
        this.changeCurrentTopic = props.onChangeTopic
    }

    componentWillReceiveProps (props) {
        this.setState({
            topic: props.topic,
        })
    }

    preview () {
        TopicService.preview(this.state.topic.id).then(response => {
            this.changeCurrentTopic(response[0])
        })
    }

    next () {
        TopicService.next(this.state.topic.id).then(response => {
            this.changeCurrentTopic(response[0])
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