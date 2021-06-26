import React, { Component } from 'react';

import QueueNumbers from './Component/QueueNumbers'
import Promote from './Component/Promote'
import './App.css';
import 'antd/dist/antd.css';
import {Row, Col} from 'antd'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  };
  }
  render() {
    return (
      <Row style={{height: "100vh"}}>
        <Col flex="640" style={{height: "100%"}}>
        <QueueNumbers/>
        </Col>
        <Col flex="1280" style={{height: "100%"}}>
        <Promote/>
        </Col>
      </Row>
    );
  }
}

export default App;
