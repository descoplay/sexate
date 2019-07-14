import React from 'react'
import Markdown from 'markdown-to-jsx'

import './style.scss'

export default class Content extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            ...props,
        }
    }

    componentWillReceiveProps (props) {
        this.setState({
            ...props,
        })
    }

    render () {
        return (
            <div className="Content">
                <Markdown>
                    {this.state.topic.content || ''}
                </Markdown>
            </div>
        )
    }
}