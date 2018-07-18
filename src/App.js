import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Map from './Map.js';
import Bar from './Bar.js';
import List from './List.js';
import loadScript from './loadScript.js';
import escapeRegExp from 'escape-string-regexp';
import locations from './locationInfo.js';
import Footer from './Footer.js';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import * as DataAPI from './DataAPI.js';

library.add(faSearch);
/*global google*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apiLoaded: false,
      collapsed: false,
      positions: [],
      selected: false,
      id: 0,
      map: null
    }
    this.toggle = this.toggle.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.back = this.back.bind(this);
    this.select = this.select.bind(this);
    this.setMap = this.setMap.bind(this);
  }

  sleeper(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  select(id) {
    if (this.state.positions[id].marker.getAnimation() === null) {
      const tmp = this.state.positions.slice(0);
      tmp[id].marker.setAnimation(google.maps.Animation.BOUNCE);
      this.setState({positions: tmp});
    }
    this.setState(state => {
      return {
        id: id,
        selected: true,
        collapsed: true,
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
    const map  = this.state.map;

    const match = new RegExp(escapeRegExp(query), 'i')
    const tmp = this.state.positions.map(function(position) {
      if (match.test(position.loc.title)) {
        const curPos = position;
        curPos.marker.setMap(map);
        return position;
      } else {
        const curPos = position;
        curPos.marker.setMap(null);
        return curPos;
      }
    });

    this.setState({positions: tmp});
  }

  toggle() {
    this.setState({
      collapsed: !this.state.collapsed
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

  setMap(map) {
    this.setState({map: map});

    const cur = this;

    let tmp = locations.map((loc, index) => {
      return DataAPI.get(loc.yelp)
      .then((yelpData) => {
        const marker = new google.maps.Marker({
          map: map,
          position: loc.location,
          title: loc.title,
          animation: null,
          id: index
        });

        marker.addListener('click', function() {
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
            cur.back();
          } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            cur.select(index);
          }
        });
        return {loc, marker, yelpData};
      });
    });

    Promise.all(tmp).then(function(results) {
      console.log(results);
      cur.setState({positions: results});
    })
            // ;
  }

  back() {
    const tmp = this.state.positions.slice(0);
    tmp[this.state.id].marker.setAnimation(null);

    this.setState(state => {
      return {
        id: 0,
        selected: false,
        positions: tmp
      }
    });
  }

  render() {
    return (
      <div className='app' role='main'>
          <Bar
            toggle = {this.toggle}
          />

          {
            this.state.apiLoaded &&
            <Map
              setMap = {this.setMap}
            />
          }

          <List
            collapsed = {this.state.collapsed}
            markers = {this.state.positions}
            updateQuery = {this.updateQuery}
            select = {this.select}
            back = {this.back}
            selected = {this.state.selected}
            id = {this.state.id}
            apiloaded = {this.state.apiLoaded}
          />

          <Footer/>
      </div>
    );
  }
}

export default App;
