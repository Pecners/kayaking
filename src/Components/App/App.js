import React from 'react';
import './App.css';
import WaveForecast from '../WaveForecast/WaveForecast';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      waves: [],
      winds: [],
      updateTime: ''
    };
  }

  componentDidMount() {
    fetch("https://api.weather.gov/gridpoints/MKX/90,62")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            waves: result.properties.waveHeight.values,
            winds: result.properties.windSpeed.values,
            updateTime: new Date(result.properties.updateTime)
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      );
  }



  render() {
    let date = new Date();
    if (this.state.updateTime instanceof Date) {
      date = this.state.updateTime;
      console.log(date.toLocaleDateString('en-US', {
        day:   'numeric',
        month: 'short',
        year:  'numeric',
      }));
    }
    console.log(this.state.waves);

    return (
      <div>
        <h1>Forecast</h1>
        <h3>
          Forecast Last Updated: {date.toLocaleDateString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            day:   'numeric',
            month: 'short',
            year:  'numeric'
          })}
        </h3>
        < WaveForecast forecast={this.state.waves} />
        <h4>Wind Speed</h4>
        <ul id="winds">
          {this.state.winds.map(wind => (
            <>
              <li>{wind.validTime}: <strong>{Math.round(wind.value / 1.609)} mph</strong></li>
            </>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
