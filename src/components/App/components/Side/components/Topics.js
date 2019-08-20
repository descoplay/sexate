import React from 'react'
import { Menu, } from 'element-react'

export default class Topics extends React.Component {
    constructor () {
        super()

        this.state = {
            topics: []
        }

        this.renderMenu = this.renderMenu.bind(this)
    }

    componentWillReceiveProps (props) {
        this.setState({
            topics: props.topics,
        })
    }

    renderMenu (_topics) {
        const menu = (_topics || this.state.topics).map(topic => {
            let item

            if (topic.childrens.length === 0) {
                item = (
                    <Menu.Item index={topic.id.toString()} key={topic.id}>
                        <i className={topic.icon}></i>
                        {topic.title}
                    </Menu.Item>
                )
            }
            else {
                item = (
                    <Menu.SubMenu
                        index={topic.id.toString()}
                        key={topic.id}
                        title={<span><i className={topic.icon}></i>{topic.title}</span>}
                    >
                        {this.renderMenu(topic.childrens)}
                    </Menu.SubMenu>
                )
            }

            return item
        })

        return menu
    }

    render () {
        return this.renderMenu()
    }
}