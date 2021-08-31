import React from 'react';
import DisclaimerContainter from './DisclaimerContainter';
import AboutContainer from './AboutContainer';
import './Popup.css';

class Warning extends React.Component {

  render() {
    let popup;
    if (this.props.type == 'disclaimer') {
      popup = < DisclaimerContainter />
    } else if (this.props.type == 'about') {
      popup = < AboutContainer />
    }
    return (
      <div className="popup-outer">
        <div className="popup-inner">
          {popup}
          <button onClick={this.props.onClick}>I Understand</button>
        </div>
      </div>
    )
  }
}

export default Warning;
