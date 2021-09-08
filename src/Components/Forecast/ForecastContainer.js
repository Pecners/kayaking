import React from 'react';
import Forecast from './Forecast';

class ForecastContainer extends React.Component {

  convert(d) {
    if (this.props.id === 'waves') {
      return Math.round(d * 3.281) + ' ft';
    } else {
      return Math.round(d / 1.609) + ' mph';
    }
  }

  windDir(d) {
    let style;
    if (this.props.windDir) {
      style = `{transform: rotate(${this.props.windDir[0].value}deg);}`;
      console.log(`Style: ${style}`);
      return '\u2191';
    } else {
      return '';
    }
  }

  handlePeriod(data) {
    if (this.props.isLoaded) {
      console.log(data[0].validTime);
      let periodTime = data[0].validTime;
      let period = periodTime.substring(
        periodTime.lastIndexOf('P') + 1,
        periodTime.length
      );
      let days = undefined;
      let converted = undefined;
      if (period.includes('D')) {
        days = parseInt(period.substring(0, period.lastIndexOf('D')));
      if (this.props.id === 'winds') {
          converted = this.convert(data[0].value) + ' mph';
        } else {
          converted =  this.convert(data[0].value) + ' ft';
        }
        return(
          <p>For the next {days} days, expect {this.props.id} of {converted}.</p>
        );
      }
    }
  }

  handleDate(dateString) {
    const convertedDate = new Date(dateString);
    return convertedDate.toLocaleDateString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      day:   'numeric',
      month: 'short',
      year:  'numeric'
    });
  }

  makeList(d) {
    let limited;
    if (d.length > 20) {
      limited = d.slice(0, 20);
    } else {
      limited = d;
    }
    return(
      <ul id={this.props.id}>
        {limited.map(item => (
          <>
            <li key={item.validTime}>{item.validTime}: <strong>{this.convert(item.value)}</strong>
            </li>
          </>
        ))}
      </ul>
    );

  }

  render() {
    let heading = '';
    if (this.props.id === 'waves') {
      heading = 'Wave Height Forecast';

    } else {
      heading = 'Wind Speed Forecast';
    }

    return (
      < Forecast
      heading={heading}
      period={this.handlePeriod(this.props.forecast)}
      isLoaded={this.props.isLoaded}
      list={this.makeList(this.props.forecast)}
      />
    )
  }
}

export default ForecastContainer;
