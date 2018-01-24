import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';
import axios from 'axios';


class ProjectCell extends Component {
  render() {
    const data = this.props.data
    const skills = data.skills.map(i => {
      return <span><span class="badge badge-pill badge-info">{i}</span> </span>
    })
    console.log(data)
    const domains = data.domains.map(i => {
      return <span><span class="badge badge-warning">{i}</span> </span>
    })

    const links = data.links.map(i => {
      return (<a href={i.url}><img src={i.icon} alt={i.title}></img> </a>)
    })

    return (
      <div class="card">
        <div class="card-body">
          <a href={data.entry}><img class="card-img-top" src={data.cover} alt="Card cap"/></a>
          <h5 class="card-title"><a href={data.entry}>{data.name}</a></h5>
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

    axios.get("https://raw.githubusercontent.com/hacking-thursday/yuan-data/master/autogen/data.json")
      .then(res => {
        this.setState({
          data: res.data
        })
        this.forceUpdate()
        console.log(res)
        console.log(this.state.data)
      });

  }

  getJumbotron() {
    return(
      <div class="jumbotron">
        <h1 class="display-3">Yuan</h1>
        <p class="lead">增加開放原始碼專案效益，媒合提案者與貢獻者，建立良好的軟體開發流程。</p>
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

  getSkills() {
    if( this.state.data.projects === undefined) {
      return []
    } else {
      var projects = this.state.data.projects
      var skills = []
      var skills_checkbox = []
      for (var i=0; i < projects.length; i++) {
        for (var j=0; j < projects[i].skills.length; j++) {
          if ( skills.indexOf(projects[i].skills[j]) == -1 ) {
            skills.push(projects[i].skills[j])
          }
        }
      }

      skills = skills.sort()
      for (var i=0; i < skills.length; i++) {
          //skills_checkbox.push(<input type="checkbox" value={skills[i]} /> {skills[i]})
          skills_checkbox.push(<label>
            <input type="checkbox" value={skills[i]} />
            {skills[i]}
          </label>
          )
      }

      return skills_checkbox
    }
  }

  getDomains() {
    if( this.state.data.projects === undefined) {
      return []
    } else {
      var projects = this.state.data.projects
      var domains = []
      var domains_checkbox = []
      for (var i=0; i < projects.length; i++) {
        for (var j=0; j < projects[i].domains.length; j++) {
          if ( domains.indexOf(projects[i].domains[j]) == -1 ) {
            domains.push(projects[i].domains[j])
          }
        }
      }

      domains = domains.sort()
      for (var i=0; i < domains.length; i++) {
          //domains_checkbox.push(<input type="checkbox" value={domains[i]} /> {domains[i]})
          domains_checkbox.push(<label>
            <input type="checkbox" value={domains[i]} />
            {domains[i]}
          </label>
          )
      }

      return domains_checkbox
    }
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
    const skills = this.getSkills()
    const domains = this.getDomains()
    const rows = this.getProjects()


    return (
        <Grid>
          {header}
          技能：{skills}
          <br/>
          領域：{domains}
          {rows}
        </Grid>
    );
  }
}

export default App;
