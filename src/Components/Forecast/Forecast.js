import React from 'react';
import './Forecast.css'

class Forecast extends React.Component {

  render() {
    return (
      <div className="Forecast">
        <h4>{this.props.heading}</h4>
        {this.props.period}
        {this.props.list}
      </div>
    )
  }
}

export default Forecast;
