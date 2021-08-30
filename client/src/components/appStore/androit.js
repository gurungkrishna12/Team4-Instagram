import React from 'react';
import logo from '../../img/androit.png'; // Tell webpack this JS file uses this image

function Androit() {
  // Import result is the URL of your image
  return <img id="stores" className="androit" src={logo} alt="Logo" />;
}

export default Androit;