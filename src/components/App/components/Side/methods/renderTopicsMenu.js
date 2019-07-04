import React from 'react'
import { Menu, } from 'element-react'

import TopicService from '../../../../../services/Topic'

const renderMenu = topics => {
    const menu = topics.map(topic => {
        let item

        if (!topic.childrens) {
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

export default () => {
    const topics = TopicService.list()

    return renderMenu(topics.data)
}

// <Menu.SubMenu
//     index="1"
//     title={<span><i className="el-icon-message"></i>Navigator One</span>}
// >
//     <Menu.ItemGroup title="Group One">
//         <Menu.Item index="1-1">Option 1</Menu.Item>
//         <Menu.Item index="1-2">Option 2</Menu.Item>
//     </Menu.ItemGroup>
//     <Menu.ItemGroup title="Group Two">
//         <Menu.Item index="1-3">Option 3</Menu.Item>
//     </Menu.ItemGroup>
// </Menu.SubMenu>
// <Menu.Item index="2"><i className="el-icon-menu"></i>Navigator Two</Menu.Item>
// <Menu.Item index="3"><i className="el-icon-setting"></i>Navigator Three</Menu.Item>