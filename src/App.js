import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';


class ProjectCell extends Component {
  render() {
    const data = this.props.data
    const skills = data.skills.map(i => {
      return <span key={ i }><span key={ i } className='badge badge-pill badge-info'>{ i }</span> </span>
    })
    const domains = data.domains.map(i => {
      return <span key={ i }><span className='badge badge-warning'>{ i }</span> </span>
    })

    const links = data.links.map(i => {
      return (<a key={ i } href={ i.url }><img src={ i.icon } alt={ i.title }></img> </a>)
    })

    return (
      <div className='card'>
        <div className='card-body'>
          <a href={ data.entry }><img className='card-img-top' src={ data.cover } alt='Card cap'/></a>
          <h5 className='card-title'><a href={ data.entry }>{ data.name }</a></h5>
          <p className='card-text'>
            { data.description }
          </p>
          <div>
            { skills }
          </div>
          <div>
            { domains }
          </div>
          <div>
            { links }
          </div>
        </div>
      </div>
    )
  }
}

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
