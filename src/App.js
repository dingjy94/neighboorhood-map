import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';
import Map from './Map.js';
import Bar from './Bar.js';
import List from './List.js';
import loadScript from './loadScript.js';
import {Container, Col} from 'reactstrap';
import escapeRegExp from 'escape-string-regexp';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiLoaded: false,
      collapsed: false,
      positions: [
        {title: 'Reitz Union', location: {lat: 29.6462791, lng: -82.3499421}},
        {title: 'SouthWest Recreation Center', location: {lat: 29.6384087, lng: -82.370569}},
        {title: 'Gainesville Place Apartment', location: {lat: 29.6228534, lng: -82.3664786}},
        {title: 'Warlmart', location: {lat: 29.6228942, lng: -82.3817995}},
        {title: 'Gator Suyaki', location: {lat: 29.6169116, lng: -82.3432027}}
      ],
      markers: [],
      query: '',
      selected: false,
      id: 0
    }
    this.setMarker = this.setMarker.bind(this);
    this.toggle = this.toggle.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.back = this.back.bind(this);
    this.select = this.select.bind(this);
  }

  select(id) {
    this.setState(state => {
      return {
        id: id,
        selected: true,
        collapsed: true
      }
    })
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

  updateQuery(query) {
    this.setState(state => {return {query: query.trim()}});
  }

  toggle() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  setMarker(markers) {
    this.setState(state => {
      return {markers: markers}
    });
  }

  loadMapScript() {
    // Load the google maps api script when the component is mounted.

    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyA7jfuX_KqHACMqNPPziUwVRjlJTKrF7_Y&v=3')
      .then((script) => {
        // Grab the script object in case it is ever needed.
        this.mapScript = script;
        this.setState({ apiLoaded: true });
      })
      .catch((err: Error) => {
        console.log("error occur")
        console.error(err.message);
      });
  }

  back() {
    this.setState(state => {
      return {
        id: 0,
        selected: false
      }
    });
  }

  render() {
    let showPos;
    if (this.state.query) {
      const match = new RegExp(escapeRegExp(this.state.query), 'i')
      showPos = this.state.positions.filter((position) => match.test(position.title));
    } else {
      showPos = this.state.positions;
    }
    
    return (
      <div className='app'>
        <Bar
          toggle = {this.toggle}
        />
          {
            this.state.apiLoaded &&
            <Map
              positions = {showPos}
              setMarker = {this.setMarker}
              query = {this.state.query}
              select = {this.select}
              back = {this.back}
              selected = {this.state.selected}
              id = {this.state.id}
            />
          }
        <List
          collapsed = {this.state.collapsed}
          markers = {showPos}
          updateQuery = {this.updateQuery}
          select = {this.select}
          back = {this.back}
          selected = {this.state.selected}
          id = {this.state.id}
        />
      </div>
    );
  }
}

export default App;
