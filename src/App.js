import React, { Component } from 'react';
import './App.css';
import yaml from 'js-yaml'
import 'bootstrap/dist/css/bootstrap.css';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import axios from 'axios';


class ProjectCell extends Component {
  render() {
    const data = this.props.data
    const skills = data.skills.map(i => {
      return <span class="badge badge-pill badge-info">{i}</span>
    })
    console.log(data)
    const domains = data.domains.map(i => {
      return <span class="badge badge-primary">{i}</span>
    })

    const links = data.links.map(i => {
      return (<a href={i.url}><img src={i.icon} alt={i.title}></img> </a>)
    })

    return (
      <div class="card">
        <div class="card-body">
          <img class="card-img-top" src={data.cover} alt="Card cap"/>
          <h5 class="card-title">{data.name}</h5>
          <p class="card-text">{data.description}</p>
          <div>{skills}</div>
          <div>{domains}</div>
          <div>{links}</div>

        </div>
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
    this.updateInputValue = this.updateInputValue.bind(this)

    axios.get("https://raw.githubusercontent.com/hacking-thursday/yuan-data/master/autogen/data.json")
      .then(res => {
        this.setState({
          data: res.data
        })
        this.forceUpdate()
      });

  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  getJumbotron() {
    return(
      <div class="jumbotron">
        <h1 class="display-3">Yuan</h1>
        <p class="lead">開放原始碼專案媒合平台</p>
      </div>
    )
  }

  getHeader() {
    const jumbotron = this.getJumbotron()
    return (<Row>
              <Col sm={12} md={12} lg={12}>
                {jumbotron}
              </Col>
            </Row>)
  }

  getProjects() {
    if( this.state.data.projects === undefined) {
      return <Row></Row>
    }
    var projects = this.state.data.projects
    const rows = []
    var cols = []
    for (var i = 0; i < projects.length; i++){
      cols.push(
        <Col sm={3} md={3} lg={3}> <ProjectCell data={projects[i]}></ProjectCell> </Col>
      )
      if ( i % 4 === 3 ){
        rows.push(<Row>{cols}</Row>)
        cols = []
      }
    }
    rows.push(<Row>{cols}</Row>)
    return rows
  }

  render() {
    const header = this.getHeader()
                <input value={this.state.inputValue} type="text" onChange={this.updateInputValue}/>
    const rows = this.getProjects()

    return (
      <Grid>
        {header}
        {rows}
      </Grid>
    );
  }
}

export default App;
