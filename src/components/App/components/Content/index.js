import React from 'react'
import Component from '@/components'
import { Layout, Button, Input, } from 'element-react'

import EditableText from '@/components/EditableText'

import TopicService from '@/services/Topic'

import './style.scss'

export default class Content extends Component {
    constructor (_props) {
        super({
            state: {
                newTopic: false,
                topic: {
                    title: '',
                    content: '',
                    sequence: '',
                    icon: '',
                },
                ..._props,
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
                _onDelete () {
                    this.setState({ topic: {}, })
                    this.onDelete(this.state.topic.id)
                },
            },
            events: {
                onSave: _props.onSave,
                onDelete: _props.onDelete,
            },
        })
    }

    async componentWillReceiveProps (_props) {
        super.componentWillReceiveProps(_props)

        if (_props.topic.id) return

        const nextSequence = await TopicService.nextAvailableSequence()

        this.setState({ topic: { ..._props.topic, sequence: nextSequence, }, })
    }

    render () {
        if (!this.state.topic) {
            return (
                <div className="Content">
                    <h1>Nenhum tópico encontrado com o ID informado</h1>
                </div>
            )
        }

        let buttonsTag = ''
        let IconInput = ''
        let SequenceInput = ''

        if (this.state.logged) {
            buttonsTag = (
                <Layout.Row gutter="6">
                    <Layout.Col span="12">
                        <Button icon="check" onClick={this._onSave}>Salvar</Button>
                    </Layout.Col>
                    <Layout.Col span="12">
                        <Button icon="delete" onClick={this._onDelete}>Remover</Button>
                    </Layout.Col>
                </Layout.Row>
            )

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
                {buttonsTag}
            </div>
        )
    }
}