import React, {Component} from 'react';
// import {Navbar, Nav, NavItem} from 'reactstrap';
/*global google*/

class Map extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      map: null,
      markers: [{lat: 29.6462791, lng: -82.3499421},
               {lat: 29.6384087, lng: -82.370569},
               {lat: 29.6228534, lng: -82.3664786},
               {lat: 29.6228942, lng: -82.3817995},
               {lat: 29.6169116, lng: -82.3432027}]
    }
  }

  componentDidMount() {
    let map = new google.maps.Map(this.mapRef.current, {
            center: {lat: 29.6428792, lng: -82.348518},
            zoom: 13
    });
    this.setState({map});

    let positions = this.state.markers;
    for (let i = 0; i < positions.length; i++) {
      var marker = new google.maps.Marker({
        map: map,
        position: positions[i],
        animation: google.maps.Animation.DROP,
        id: i
      });
    }
  }

  render() {
    return (
      <div className="map" id="map" ref={this.mapRef}>
      </div>
    );
  }
}

export default Map;