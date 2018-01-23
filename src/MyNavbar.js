import React, { Component } from 'react';


class MyNavbar extends Component {
  render() {

    const navbarInstance = (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <a className='navbar-brand' href='/'>Yuan</a>
      <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='navbarNav'>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <a className='nav-link' href='https://github.com/hacking-thursday/yuan-data'> 如何新增新專案</a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='https://gitter.im/hacking-thursday/yuan-data'>聊天室</a>
          </li>
        </ul>
      </div>
    </nav>
    );
    return navbarInstance
  }
}

export default MyNavbar;
