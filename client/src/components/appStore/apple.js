import React from 'react';
import logo from '../../img/apple.png'; // Tell webpack this JS file uses this image

function Apple() {
  // Import result is the URL of your image
  return <img id="stores" className="apple" src={logo} alt="Logo" />;
}

export default Apple;