import React, {Component} from 'react';
/*global google*/

class Map extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      map: null,
      position: [],
      markers:[],
    };
    this.clearMarker = this.clearMarker.bind(this);
    this.preId = 0;
  }

  componentDidMount() {
    let map = new google.maps.Map(this.mapRef.current, {
            center: {lat: 29.6428792, lng: -82.348518},
            zoom: 13

     });
    this.setState(state => {return {map: map}});

  }

  componentDidUpdate() {
    

    if(this.state.markers.length != this.props.positions.length) {
      this.clearMarker();

      let tmp = [];
      this.props.positions.map((position, index) => {
        
        const marker = new google.maps.Marker({
          map: this.state.map,
          position: position.location,
          title: position.title,
          animation: null,
          id: index
        })
        
        const select = this.props.select;
        const back = this.props.back;
        const selected = this.props.selected;

        marker.addListener('click', function() {
          if (selected) {
            back();
          } else {
            select(this.id);
          }
        });
        
        tmp.push(marker);
      });
      this.setState(state => {return {markers: tmp}});
    }

    const id = this.props.id;
    const marker = this.state.markers[id];

    if (this.state.markers[this.preId]) {
      this.state.markers[this.preId].setAnimation(null);
    }

    if (this.props.selected) {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        this.preId = id;
      }
    }
  }

  clearMarker() {
    const cleared = this.state.markers.map((marker) => {
      marker.setMap(null);
    });
  }

  render() {
    return (
      <div className="map" id="map" ref={this.mapRef}>
      </div>
    );
  }
}

export default Map;0