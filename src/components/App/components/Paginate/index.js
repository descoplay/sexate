import React from 'react'
import { Layout, Button, } from 'element-react'

import './style.scss'

export default class Paginate extends React.Component {
    render () {
        return (
            <div className="Paginate">
                <Layout.Row className="padding">
                    <Layout.Col span="12" className="preview">
                        <Button>
                            <i className="el-icon-upload el-icon-right"></i>
                            Anterior
                        </Button>
                    </Layout.Col>
                    <Layout.Col span="12" className="next">
                        <Button>
                            Seguinte
                            <i className="el-icon-upload el-icon-right"></i>
                        </Button>
                    </Layout.Col>
                </Layout.Row>
            </div>
        )
    }
}