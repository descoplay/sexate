import React from 'react'
import { Input, } from 'element-react'

import 'element-theme-default'

import Markdown from 'markdown-to-jsx'

class EditableText extends React.Component {
    constructor (_props,) {
        super()

        this.state = {
            value: _props.value,
            editable: _props.editable,
            envelope: _props.envelope,
            component: _props.component,
            placeholder: _props.placeholder,
        }

        this.onChange = _props.onChange
    }

    componentWillReceiveProps (_props,) {
        this.setState({
            value: _props.value,
            editable: _props.editable,
            envelope: _props.envelope,
            component: _props.component,
            placeholder: _props.placeholder,
        },)
    }

    render () {
        if (this.state.editable) {
            return (
                <Input
                    value={this.state.value}
                    onChange={this.onChange}
                    placeholder={this.state.placeholder}
                />
            )
        }

        if (this.state.component) {
            const Component = this.state.component

            return (<Component>{this.state.value}</Component>)
        }

        switch (this.state.envelope) {
            case 'h1': return (<h1>{this.state.value}</h1>)
            case 'h2': return (<h2>{this.state.value}</h2>)
            case 'h3': return (<h3>{this.state.value}</h3>)
            case 'h4': return (<h4>{this.state.value}</h4>)
            case 'h5': return (<h5>{this.state.value}</h5>)
            case 'h6': return (<h6>{this.state.value}</h6>)
            case 'h7': return (<h7>{this.state.value}</h7>)
            case 'i': return (<i>{this.state.value}</i>)
            case 'u': return (<u>{this.state.value}</u>)
            case 'b': return (<b>{this.state.value}</b>)
            case 'div': return (<div>{this.state.value}</div>)
            case 'pre': return (<pre>{this.state.value}</pre>)
            case 'markdown': return (<Markdown>{this.state.value}</Markdown>)
            case 'span':
            default: return (<span>{this.state.value}</span>)

        }

    }
}

export default EditableText