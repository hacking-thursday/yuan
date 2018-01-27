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
      data: {},
      projects: []
    };

    this.selectedSkills = new Set([])
    this.selectedDomains = new Set([])

    axios.get('https://raw.githubusercontent.com/hacking-thursday/yuan-data/master/autogen/data.json')
      .then(res => {
        this.setState({
          data: res.data,
          projects: res.data.projects,
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

  checkboxOnChange(key,e) {
    var selectedKey = 'selectedSkills'
    if (key === 'skills') {
      selectedKey = 'selectedSkills'
    }else if (key === 'domains') {
      selectedKey = 'selectedDomains'
    }else {
      return
    }

    if (e.target.checked === true) {
      this[selectedKey].add(e.target.value)
    }else{
      this[selectedKey].delete(e.target.value)
    }
    console.log(this.selectedSkills)
    var projects = this.state.data.projects.filter(o => {
      if (this[selectedKey].size === 0) {
        return true
      }
      return Array.from(this[selectedKey]).map(i => o[key].includes(i)).every(i => i === true)
    })
    this.setState({
      projects: projects,
    })
  }

  getSkills() {
    if (this.state.data.projects === undefined) {
      return ""
    } else {
      var projects = this.state.data.projects
      var skills = []
      var skills_checkbox = []
      for (var i = 0; i < projects.length; i++) {
        for (var j = 0; j < projects[i].skills.length; j++) {
          if (skills.indexOf(projects[i].skills[j]) == -1) {
            skills.push(projects[i].skills[j])
          }
        }
      }

      skills = skills.sort()
      for (var i = 0; i < skills.length; i++) {
        skills_checkbox.push(<label>
                               <input type='checkbox' value={ skills[i] } onChange={this.checkboxOnChange.bind(this, 'skills')} />
                               { skills[i] }
                             </label>
        )
      }

      return skills_checkbox
    }
  }

  getDomains() {
    if (this.state.data.projects === undefined) {
      return ""
    } else {
      var projects = this.state.data.projects
      var domains = []
      var domains_checkbox = []
      for (var i = 0; i < projects.length; i++) {
        for (var j = 0; j < projects[i].domains.length; j++) {
          if (domains.indexOf(projects[i].domains[j]) == -1) {
            domains.push(projects[i].domains[j])
          }
        }
      }

      domains = domains.sort()
      for (var i = 0; i < domains.length; i++) {
        domains_checkbox.push(<label>
                                <input type='checkbox' value={ domains[i] } onChange={this.checkboxOnChange.bind(this, 'domains')} />
                                { domains[i] }
                              </label>
        )
      }

      return domains_checkbox
    }
  }

  getProjects() {
    if (this.state.projects === undefined) {
      return <Row></Row>
    }
    var projects = this.state.projects
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
    const skills = this.getSkills()
    const domains = this.getDomains()
    const rows = this.getProjects()


    return (
      <Grid>
        { header }
        技能：{ skills }
        <br/>
        領域：{ domains }
        { rows }
      </Grid>
      );
  }
}

export default App;
