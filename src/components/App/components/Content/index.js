import React from 'react'
import { Input, } from 'element-react'
import Markdown from 'markdown-to-jsx'

import Component from '@/components'

import './style.scss'

export default class Content extends Component {
    constructor (props) {
        super({
            state: {
                ...props,
                record: {
                    title: '',
                    content: '',
                },
            },
            methods: {
                onChangeRecord (_field, _value) {
                    const record = this.state.record

                    record[_field] = _value

                    this.setState({ record, })
                },
            },
        })
    }

    render () {
        let title = <h1>{this.state.topic.title}</h1>
        let markdown = (
            <Markdown>
                {this.state.topic.content || ''}
            </Markdown>
        )

        if (this.state.logged) {
            // if (this.state.newTopic) {
            title = (
                <Input
                    placeholder="Título"
                    value={this.state.record.title}
                    onChange={value => { this.onChangeRecord('title', value)}}
                />
            )
            markdown = (
                <Input
                    placeholder="Conteúdo"
                    value={this.state.record.content}
                    onChange={value => { this.onChangeRecord('content', value)}}
                />
            )
            // }
        }

        return (
            <div className="Content">
                {title}
                {markdown}
            </div>
        )
    }
}