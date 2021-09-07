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
      windDir: [],
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

  normalize(d) {

    Date.prototype.addHours = function(h) {
      this.setMilliseconds(this.getMilliseconds() + (h*60*60*1000));
      return this;
    };

    let counter = 0;
    let convertedObject = [];
    let currentHour = new Date().getHours();

    d.map((item) => {
      let p = item.validTime;
      let period = p.substring(
        p.lastIndexOf('P') + 1,
        p.length
      );
      let days = 0;
      let hours = parseInt(period.substring(period.lastIndexOf('T') + 1,
                           period.lastIndexOf('H')));
      if (p.includes('D')) {
        days = parseInt(period.substring(0, period.lastIndexOf('D')));
      }
      let isFirst = true;
      let currentPeriod = hours + (days * 24);
      let fullPeriod = counter + currentPeriod;
      //console.log(`Full period: ${fullPeriod}`);
      let startTime = new Date(p.substring(0,
      p.lastIndexOf('/')));
      let newTime;
      let newObject = [];
      //console.log(`Start time: ${startTime.addHours(24)}`);
      /* For loop iterates for all hours represented
      by the period */
      for (var i = counter; i < fullPeriod; i++) {
        let toAdd;
        if (isFirst) {
          toAdd = 0;
          isFirst = false;
        } else {
          toAdd = 1;
        }
        newTime = startTime.addHours(toAdd);
        //console.log(newTime);
          convertedObject[i] = {
            index: i,
            value: item.value,
            validTime: newTime.toLocaleDateString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              day:   'numeric',
              month: 'short',
              year:  'numeric'
            })
          };
          //console.log(convertedObject[i]);

      }
      console.log(`Full period: ${fullPeriod}`);
      console.log(`Counter: ${counter}`);
      counter = fullPeriod;
    });
    //console.log(`Period covers the next ${counter} hours.`);
    //console.log(convertedObject);

    return convertedObject;
  }

  componentDidMount() {
    fetch("https://api.weather.gov/gridpoints/MKX/90,62")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            waves: this.normalize(result.properties.waveHeight.values),
            winds: this.normalize(result.properties.windSpeed.values),
            windDir: this.normalize(result.properties.windDirection.values),
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
      /* console.log(date.toLocaleDateString('en-US', {
        day:   'numeric',
        month: 'short',
        year:  'numeric',
      })); */
    }
    //console.log(this.state.waves);
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
        windDir={this.state.windDir}
        isLoaded={this.state.isLoaded}
        />
      </div>
    );
  }
}

export default App;
