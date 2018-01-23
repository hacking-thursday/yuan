import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import ProjectCell from './ProjectCell.js';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    };

    axios.get('https://raw.githubusercontent.com/hacking-thursday/yuan-data/master/autogen/data.json')
      .then(res => {
        this.setState({
          data: res.data
        })
        this.forceUpdate()
      });

  }

  getJumbotron() {
    return (
      <div className='jumbotron'>
        <h1 className='display-3'>Yuan</h1>
        <p className='lead'>增加開放原始碼專案效益，媒合提案者與貢獻者，建立良好的軟體開發流程。</p>
      </div>
    )
  }

  getHeader() {
    const jumbotron = this.getJumbotron()
    return (<Row>
              <Col sm={ 12 } md={ 12 } lg={ 12 }>
                { jumbotron }
              </Col>
            </Row>)
  }

  getProjects() {
    if (this.state.data.projects === undefined) {
      return <Row></Row>
    }
    var projects = this.state.data.projects
    const rows = []
    var cols = []
    for (var i = 0; i < projects.length; i++) {
      cols.push(
        <Col sm={ 3 } md={ 3 } lg={ 3 }>
          <ProjectCell data={ projects[i] }></ProjectCell>
        </Col>
      )
      if (i % 4 === 3) {
        rows.push(<Row>
                    { cols }
                  </Row>)
        cols = []
      }
    }
    rows.push(<Row>
                { cols }
              </Row>)
    return rows
  }

  render() {
    const header = this.getHeader()
    const rows = this.getProjects()


    return (
      <Grid>
        { header }
        { rows }
      </Grid>
      );
  }
}

export default App;
