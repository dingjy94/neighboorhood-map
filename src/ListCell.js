import React, {Component} from 'react';
import * as DataAPI from './DataAPI.js';
import {Container, Row, Col} from 'reactstrap';

class ListCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }

  componentDidMount() {
    DataAPI.get(this.props.yelp)
    .then((data) => {
      this.setState({data: data});
    });
  }

  render() {
    const data = this.state.data;
    let img, name, stars;
    if (data != null) {
      console.log(data);
      img = data.image_url;
      const rate = data.rating;
      name = data.name;
      stars = [];
      for (let i = 0; i < Math.floor(rate); i++) {
        stars.push(<small className="fas fa-star" key={i}></small>);
      }
      if (Math.floor(rate) < rate) {
        stars.push(<small className="fas fa-star-half"></small>);
      }
    }
  
    return(
      <Container>
      {this.state.data == null && 
       <h1 className="fas fa-spinner text-white"></h1>}
      {this.state.data != null &&
        <Row>
          <Col>
            <Row>{name}</Row>
            <Row>{stars}</Row>
          </Col>
          <Col className="listImg">
            <img src={img} alt={name}/>
          </Col>
        </Row>
      } 
      </Container>
    );
  }
}

export default ListCell;