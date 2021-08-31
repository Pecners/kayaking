import React from 'react';
import './Forecast.css'

class WaveForecast extends React.Component {

  handleWaves(data) {
    if (this.props.isLoaded) {
      console.log(data[0].validTime);
      let periodTime = data[0].validTime;
      let period = periodTime.substring(
        periodTime.lastIndexOf('P') + 1,
        periodTime.length
      );
      let days = undefined;
      if (period.includes('D')) {
        days = parseInt(period.substring(0, period.lastIndexOf('D')));
        return(
          <p>For the next {days} days, expect waves of {data[0].value * 3.281} ft.</p>
        );
      }
    }
  }

  render() {
    return (
      <div className="Forecast">
        <h4>Wave Height Forecast</h4>
        {this.handleWaves(this.props.forecast)}
        <ul id="waves">
          {this.props.forecast.map(wave => (
            <>
              <li key={wave.validTime}>{wave.validTime}: <strong>{Math.round(wave.value * 3.281)} ft</strong>
                {console.log(typeof wave.validTime)}
              </li>
            </>
          ))}
        </ul>
      </div>
    )
  }
}

export default WaveForecast;
