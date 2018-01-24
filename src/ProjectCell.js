import React, { Component } from 'react';


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

export default ProjectCell;
