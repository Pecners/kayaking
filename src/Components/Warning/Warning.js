import React from 'react';
import './Warning.css';

class Warning extends React.Component {
  render() {
    return (
      <div className="warning-outer">
        <div className="warning-inner">
          <h1>WARNING</h1>
          <p>I am not a meteorologist, and I offer no guarantees regarding
          the data presented on this page.</p>
          <button onClick={this.props.onClick}>I Understand</button>
        </div>
      </div>
    )
  }
}

export default Warning;
