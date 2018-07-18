import React, {Component} from 'react';
import {Collapse, Form, FormGroup, Input, Container,
        Row, Col, ListGroup, ListGroupItem, Button} from 'reactstrap';
import * as DataAPI from './DataAPI.js';
import ListCell from './ListCell.js';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      data: null
    }

  }

  componentDidUpdate() {
    if (this.props.selected && 
       (this.state.data === null || typeof this.state.data == 'undefined' || this.state.data.name != this.props.markers[this.props.id].loc.title)) {
        DataAPI.get(this.props.markers[this.props.id].loc.yelp)
        .then((data) => {
          this.setState({data: data});
        })
    }
  }

  update(query) {
    const updateQuery = this.props.updateQuery;
    updateQuery(query.trim());
    this.setState(state => {
      return {
        query: query
      }
    });
  }

  render() {
    const markers = this.props.markers;
    const back = this.props.back;
    const select = this.props.select;
    const id = this.props.id;
    const selected = this.props.selected;
    const data = this.state.data;
    let display;
  
    if (selected) {
      if (typeof this.state.data == 'undefined') {
        display = <Row>Error</Row>;
      } else if (this.state.data === null) {
        display = <Row><h1 className="fas fa-spinner text-white"></h1></Row>;
      } else if (this.state.data.name != markers[id].loc.title) {
        display = <Row><h1 className="fas fa-spinner text-white"></h1></Row>;
      } else {
        let stars = [];
        const rate = this.state.data.rating;
        for (let i = 0; i < Math.floor(rate); i++) {
          stars.push(<small className="fas fa-star" key={i}></small>);
        }
        if (Math.floor(rate) < rate) {
          stars.push(<small className="fas fa-star-half"></small>);
        }
        display = <div role="grid">
                    <Row role="gridcell" className="align-middle resImage"><img src={this.state.data.image_url} alt={this.state.data.name}/></Row>
                    <Row role="gridcell" className="text-bold bg-dark text-white resName"><h5>{this.state.data.name}</h5></Row>
                    <Row role="gridcell" className="resRate bg-dark text-white">
                      {stars}    
                    </Row>
                    <div role="gridcell" className="resList">
                      <Row role="gridcell"><i className="fas fa-phone logo"></i> {this.state.data.display_phone}</Row>
                      <Row role="gridcell"><i className="fas fa-map-marker-alt logo"></i>{this.state.data.location.address1}</Row>
                      <Row role="gridcell">
                        <a href={this.state.data.url} className="text-danger">
                          <i className="fab fa-yelp logo"></i>
                          See detail on Yelp!
                        </a>
                      </Row>
                    </div>
                  </div>;
      }
    }

    return (
      <Collapse isOpen={this.props.collapsed} className="bg-light sidebar listMenu"> 
        {!selected &&
          <Container>
            <Row className="searchbox bg-dark">
              <Col>
                <Form>
                  <FormGroup>
                    <Input placeholder={this.state.query.length === 0 ? "Filter by name..." : undefined} 
                    onChange={(event) => this.update(event.target.value)}
                      value = {this.state.query}
                      id="search"/>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
  
            <Row className="bg-light listRow">
              <Col>
                <ListGroup>
                  {markers.map((marker, id) => (marker.marker && marker.marker.map != null) &&
                    <ListGroupItem key={id} onClick={e => select(id)} tabIndex={id}>
                      <ListCell
                        yelp = {marker.loc.yelp}
                      />
                    </ListGroupItem>
                  )}
                </ListGroup>
                </Col>
            </Row>
          </Container>
        }
        {selected && this.props. apiloaded &&
          <Container>
            <Row className="bg-dark">
              <Button color='dark' onClick={back}>Back</Button>
            </Row>
            {display}
          </Container>
        }
      </Collapse>
    );
  }
}

export default List;
