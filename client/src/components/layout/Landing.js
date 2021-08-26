import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Apple from '../../apple';
import Androit from '../../androit';

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 id="Header" className="display-3 mb-4">Insta-Gram
                </h1>
                <p id="Lading-p" className="lead"> Create a profile and share photos and videos</p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">Sign Up</Link>
                <Link to="/login" className="btn btn-lg btn-light">Login</Link>
              </div>
            </div>
          <div>
            <a target="__blanck" href="https://apps.apple.com/app/instagram/id389801252?vt=lo" tabIndex="0">
            <Apple className="stores" />
              </a>
              <a target="__blanck" href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb&utm_campaign=loginPage&ig_mid=EF83985F-0572-451E-BBD0-222F9C62AC68&utm_content=lo&utm_medium=badge" tabIndex="0">
            <Androit className="stores" />
              </a>
          </div>
          </div>
        </div>
        
    
      </div>
    )
  }
}

export default Landing;