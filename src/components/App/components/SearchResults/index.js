import React from 'react'

import Component from '@/components'

import './style.scss'

export default class Content extends Component {
    constructor (props) {
        super({
            state: {
                topics: props.topics,
            },
            events: {
                onSelect: props.onSelect,
            },
        })
    }

    render () {
        const results = []

        this.state.topics.map((topic, key) => {
            results.push(<li key={key} onClick={() => { this.onSelect(topic)}}>{topic.title}</li>)

            return ''
        })

        return (
            <div className="SearchResults">
                <h2>{this.state.topics.length} Resultados Encontrados</h2>
                <ul>
                    {results}
                </ul>
            </div>
        )
    }
}