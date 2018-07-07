import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import Map from './Map.js';
import Bar from './Bar.js';
import loadScript from './loadScript.js';
import {Container, Col} from 'reactstrap';

class App extends Component {
  state = {
    apiLoaded: false
  }

  componentDidMount() {
    if (!window.google) {
      this.loadMapScript();
    }
    else if (!window.google.maps) {
      this.loadMapScript();
    }
    else {
      this.setState({ apiLoaded: true })
    }
  }

  loadMapScript() {
    // Load the google maps api script when the component is mounted.

    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyA7jfuX_KqHACMqNPPziUwVRjlJTKrF7_Y&v=3')
      .then((script) => {
        // Grab the script object in case it is ever needed.
        console.log(script);
        this.mapScript = script;
        this.setState({ apiLoaded: true });
      })
      .catch((err: Error) => {
        console.log("error occur")
        console.error(err.message);
      });
  }

  render() {
    return (
      <div className='app'>
        <Bar/>
          {
            this.state.apiLoaded &&
            <Map
            />
          }

      </div>
    );
  }
}

export default App;
