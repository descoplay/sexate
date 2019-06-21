import React from 'react';
import './App.css';

import { Layout } from 'element-react';

import Side from './Side.js'
function App() {
  return (
    <div className="App">
      <Layout.Row>
        <Layout.Col span="4">
          <Side />
        </Layout.Col>
      </Layout.Row>
    </div>
  );
}

export default App;
