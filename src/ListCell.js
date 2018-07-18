import React, {Component} from 'react';
import {Container, Row, Col} from 'reactstrap';

class ListCell extends Component {
  render() {
    const data = this.props.yelp;
    let img, name, stars;
    if (data != null) {
      img = data.image_url;
      const rate = data.rating;
      name = data.name;
      stars = [];
      let i;
      for (i = 0; i < Math.floor(rate); i++) {
        stars.push(<small className="fas fa-star" key={i}></small>);
      }
      if (Math.floor(rate) < rate) {
        stars.push(<small className="fas fa-star-half" key={i}></small>);
      }
    }
  
    return(
      <Container>
      {data == null && 
       <h1 className="fas fa-spinner text-white"></h1>}
      {data != null &&
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