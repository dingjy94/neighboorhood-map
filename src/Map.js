import React, {Component} from 'react';
/*global google*/

class Map extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    let map = new google.maps.Map(this.mapRef.current, {
            center: {lat: 29.6428792, lng: -82.348518},
            zoom: 13

     });
    this.props.setMap(map);
  }

  render() {
    return (
      <div role="application" className="map" id="map" ref={this.mapRef}>
      </div>
    );
  }
}

export default Map;0