import React from 'react'

import './style.scss'

export default class Content extends React.Component {
    constructor (props) {
        super()

        this.state = {
            topics: props.topics,
        }

        this.onSelect = props.onSelect
    }

    componentWillReceiveProps (props) {
        this.setState({
            topics: props.topics,
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