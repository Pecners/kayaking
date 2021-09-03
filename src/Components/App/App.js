import React from 'react';
import './App.css';
import ForecastContainer from '../Forecast/ForecastContainer';
import Popup from '../Popup/Popup';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      popup: 'disclaimer',
      waves: [],
      winds: [],
      updateTime: ''
    };
    this.handlePopup = this.handlePopup.bind(this);
    this.handleAbout = this.handleAbout.bind(this);
    this.handleDisclaimer = this.handleDisclaimer.bind(this);
  }

  handlePopup() {
    this.setState({
      popup: null
    })
  }

  handleAbout() {
    this.setState({
      popup: 'about'
    })
  }

  handleDisclaimer() {
    this.setState({
      popup: 'disclaimer'
    })
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
    let popup;
    if (this.state.popup) {
      popup = < Popup onClick={this.handlePopup} type={this.state.popup}/>;
    }

    return (
      <div>
        {popup}
        <header className="topnav">
          <nav className="topnav-body">
            <h1>Southshore YakCast</h1>
            <button onClick={this.handleAbout}>About</button>
            <button onClick={this.handleDisclaimer}>Disclaimer</button>
          </nav>
        </header>
        <h3>
          Forecast Last Updated: {date.toLocaleDateString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            day:   'numeric',
            month: 'short',
            year:  'numeric'
          })}
        </h3>
        < ForecastContainer
        id="waves"
        forecast={this.state.waves}
        isLoaded={this.state.isLoaded}
        heading="Wave Height Forecast"
        />
        < ForecastContainer
        id="winds"
        forecast={this.state.winds}
        isLoaded={this.state.isLoaded}
        />
      </div>
    );
  }
}

export default App;
