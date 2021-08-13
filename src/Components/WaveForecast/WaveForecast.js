import React from 'react';

class WaveForecast extends React.Component {
  render() {
    return (
      <div>
        <h4>Wave Height Forecast</h4>
        <ul id="waves">
          {this.props.forecast.map(wave => (
            <>
              <li>{wave.validTime}: <strong>{Math.round(wave.value * 3.281)} ft</strong></li>
            </>
          ))}
        </ul>
      </div>
    )
  }
}

export default WaveForecast;
