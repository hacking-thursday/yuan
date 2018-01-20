import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import yaml from 'js-yaml'
import 'bootstrap/dist/css/bootstrap.css';
import {
  Grid,
  Row,
  Col
} from 'react-bootstrap';
import axios from 'axios';

var raw = `

---
name: FarmBot
description: FarmBot Software Architecture.
cover: https://avatars2.githubusercontent.com/u/5784869?s=200&v=4
entry: "#"
contact:
- your@email.com
- twitter account
links:
- title: Facebook
  url: https://www.facebook.com/groups/FarmBotTUG/
  icon: https://raw.githubusercontent.com/hacking-thursday/yuan/master/icons/webicon-facebook-m.png
- title: GitHub
  url: https://github.com/FBTUG
  icon: https://raw.githubusercontent.com/hacking-thursday/yuan/master/icons/webicon-github-m.png
skills:
- OS
- Web
- Arduino
domains:
other: String. Put anything you want to said.


`
class ProjectCell extends Component {
  render() {
    const data = this.props.data
    const skills = data.skills.map(i => {
      return <span class="badge badge-info">{i}</span>
    })

    const links = data.links.map(i => {
      return (<a href={i.url}><img src={i.icon} alt={i.title}></img> </a>)
    })

    return (
      <div class="card">
        <div class="card-body">
          <img class="card-img-top" src={data.cover} alt="Card image cap"/>
          <h5 class="card-title">{data.name}</h5>
          <p class="card-text">{data.description}</p>
          <div>{skills}</div>
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
      inputValue: 'GG'
    };
    this.updateInputValue = this.updateInputValue.bind(this)

//    axios.get("https://api.github.com/repos/kjelly/auto_config/contents/roles")
//      .then(res => {
//        console.log(res)
//      });

  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  getHeader() {
    return (<Row>
              <Col sm={12} md={12} lg={12}>
                <input value={this.state.inputValue} type="text" onChange={this.updateInputValue}/>
              </Col>
            </Row>)
  }

  getProjects() {
    var arr = [1, 2, 3, 4, 5, 6]
    const rows = []
    var cols = []
    const data = yaml.load(raw)
    for (var i = 0; i < arr.length; i++){
      cols.push(
        <Col sm={3} md={3} lg={3}> <ProjectCell data={data}></ProjectCell> </Col>
      )
      if ( i % 4 === 3 ){
        rows.push(<Row>{cols}</Row>)
        cols = []
      }
    }
    rows.push(<Row>{cols}</Row>)
    console.log(rows)
    return rows
  }

  render() {

    const header = this.getHeader()
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
