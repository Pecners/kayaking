import React from 'react';
import Disclaimer from './Disclaimer';
import About from './About';
import './Popup.css';

class Warning extends React.Component {

  render() {
    let popup;
    if (this.props.type == 'disclaimer') {
      popup = < Disclaimer />
    } else if (this.props.type == 'about') {
      popup = < About />
    }
    return (
      <div className="popup-outer">
        <div className="popup-inner">
          {popup}
          <button onClick={this.props.onClick}>Got it!</button>
        </div>
      </div>
    )
  }
}

export default Warning;
