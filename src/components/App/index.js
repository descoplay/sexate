import React from 'react'
import './style.scss'

import { Layout, } from 'element-react'

import Side from './components/Side'
import Content from './components/Content'
import Paginate from './components/Paginate'

function App () {
    return (
        <div className="App">
            <Layout.Row>
                <Layout.Col span="4">
                    <Side />
                </Layout.Col>
                <Layout.Col span="20">
                    <Content />
                    <Paginate />
                </Layout.Col>
            </Layout.Row>
        </div>
    )
}

export default App