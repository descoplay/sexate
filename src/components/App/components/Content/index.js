import React from 'react'
import Component from '@/components'
import { Button, Input, } from 'element-react'

import EditableText from '@/components/EditableText'

import './style.scss'

export default class Content extends Component {
    constructor (_props) {
        super({
            state: {
                ..._props,
                newTopic: false,
                topic: {
                    title: '',
                    content: '',
                    sequence: '',
                    icon: '',
                },
            },
            methods: {
                onChangeRecord (_field, _value) {
                    const topic = this.state.topic

                    topic[_field] = _value

                    this.setState({ topic, })
                },
                _onSave () {
                    this.onSave(this.state.topic)
                },
            },
            events: {
                onSave: _props.onSave,
            },
        })
    }

    render () {
        let buttonTag = ''
        let IconInput = ''
        let SequenceInput = ''

        if (this.state.logged) {
            buttonTag = <Button icon="check" onClick={this._onSave}>Salvar</Button>

            IconInput = <Input
                placeholder="Ícone"
                value={this.state.topic.icon}
                onChange={v => this.onChangeRecord('icon', v)}
            />

            SequenceInput = <Input
                type="number"
                placeholder="Sequencia"
                value={this.state.topic.sequence}
                onChange={v => this.onChangeRecord('sequence', v)}
            />
        }

        return (
            <div className="Content">
                <EditableText
                    value={this.state.topic.title}
                    onChange={v => this.onChangeRecord('title', v)}
                    envelope="h1"
                    editable={this.state.logged}
                    placeholder="Título"
                />
                <EditableText
                    value={this.state.topic.content || ''}
                    onChange={v => this.onChangeRecord('content', v)}
                    envelope="markdown"
                    editable={this.state.logged}
                    placeholder="Conteúdo"
                />
                {IconInput}
                {SequenceInput}
                {buttonTag}
            </div>
        )
    }
}