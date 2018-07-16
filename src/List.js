import React, {Component} from 'react';
import {Collapse, Form, FormGroup, Input, Container,
        Row, Col, ListGroup, ListGroupItem, Button} from 'reactstrap';
import * as DataAPI from './DataAPI.js';

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
        display = <Row>Loading</Row>;
      } else if (this.state.data.name != markers[id].loc.title) {
        display = <Row>Loading</Row>;
      } else {
        display = <div role="grid">
                    <Row role="gridcell"><img src={this.state.data.image_url} alt={this.state.data.name}/></Row>
                    <Row role="gridcell">Name: {this.state.data.name}</Row>
                    <Row role="gridcell">Number: {this.state.data.display_phone}</Row>
                    <Row role="gridcell">Rating: {this.state.data.rating}</Row>
                    <Row role="gridcell"><a href={this.state.data.url}>Yelp Link</a></Row>
                    <Row role="gridcell">Address: </Row>
                    <Row role="gridcell">{this.state.data.location.address1}</Row>
                    <Row role="gridcell">{this.state.data.location.address2}</Row>
                    <Row role="gridcell">{this.state.data.location.address3}</Row>
                    <Row role="gridcell">{this.state.data.location.city}</Row>
                    <Row role="gridcell">{this.state.data.location.state}</Row>
                  </div>;
      }
    }

    return (
      <Collapse isOpen={this.props.collapsed} className="bg-light sidebar"> 
        {!selected &&
          <Container>
            <Row>
              <Col>
                <Form>
                  <FormGroup>
                    <label for="search" class="visuallyhidden">Search: </label>
                    <Input placeholder={this.state.query.length === 0 ? "Search" : undefined} 
                    onChange={(event) => this.update(event.target.value)}
                      value = {this.state.query}
                      id="search"/>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
  
            <Row>
              <Col>
                <ListGroup>
                  {markers.map((marker, id) => (marker.marker && marker.marker.map != null) &&
                    <ListGroupItem key={id} onClick={e => select(id)} tabindex={id}>
                      {marker.loc.title}
                    </ListGroupItem>
                  )}
                </ListGroup>
                </Col>
            </Row>
          </Container>
        }
        {selected &&
          <Container>
            <Row>
              <Button color='primary' onClick={back}>Back</Button>
            </Row>
            {display}
          </Container>
        }
      </Collapse>
    );
  }
}

export default List;
