import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Logo from './netlify-logo.svg'
import './App.css';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login = () => {
    this.props.auth.login();
  }

  logout = () => {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="App">
        <div className='nav'>
          <div className='nav-bg'></div>
          <div className="logoText">
            <Link to='/'>
              <img alt="Serverless" src={Logo} />
            </Link>
          </div>
          <div className="right-nav">
          { isAuthenticated()
           ? <button className="authButton" onClick={this.logout}>Logout</button>
           :  <span></span>
          }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
