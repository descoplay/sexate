import React from 'react'
import { Menu, } from 'element-react'

import Component from '@/components'

export default class Topics extends Component {
    constructor () {
        super({
            state: {
                topics: [],
            },
            methods: {
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
                },
            },
        })
    }

    render () {
        return this.renderMenu()
    }
}