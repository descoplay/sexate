import React from 'react'
import { Menu, } from 'element-react'

const renderMenu = topics => {
    const menu = topics.map(topic => {
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
                    {renderMenu(topic.childrens)}
                </Menu.SubMenu>
            )
        }

        return item
    })

    return menu
}

export default _topics => {
    return renderMenu(_topics)
}