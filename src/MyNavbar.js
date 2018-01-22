import React, { Component } from 'react';
import axios from 'axios';


class MyNavbar extends Component {
  render() {

  const navbarInstance = (
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Yuan</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="https://github.com/hacking-thursday/yuan-data"> 如何新增新專案</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="https://gitter.im/hacking-thursday/yuan-data">聊天室</a>
      </li>
    </ul>
  </div>
</nav>
  );


    return navbarInstance
  }
}

export default MyNavbar;
