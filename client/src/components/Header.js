import { func } from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';


class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (<li><a href="/auth/google" >Loging with Google</a></li>)
      default:
        return <li><a href="/api/logout" >Logout</a></li>;
    }
  }

  // To add style to the logo in mobile we need to do this 
//   @media only screen and (max-width: 992px)
//    nav .brand-logo {
//     left: 10%;
//     transform: translateX(-50%);
//   }

  render() {
    return(
  <nav>
      <div className="nav-wrapper">
        <Link 
        to={this.props.auth ? '/accounts': '/'} 
        className="left brand-logo">Inst</Link>
        <ul id="nav-mobile" className="right">
          {this.renderContent()}
        </ul>
      </div>
  </nav>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}


export default connect(mapStateToProps)(Header);
