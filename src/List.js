import React, {Component} from 'react';
import {Collapse, Form, FormGroup, Input, Container,
        Row, Col, ListGroup, ListGroupItem, Button} from 'reactstrap';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }

  }

  update(query) {
    const updateQuery = this.props.updateQuery;
    updateQuery(query);
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

    return (
      <Collapse isOpen={this.props.collapsed} className="bg-light sidebar"> 
        {!selected &&
          <Container>
            <Row>
              <Col>
                <Form>
                  <FormGroup>
                    <Input placeholder={this.state.query.length === 0 ? "Search" : undefined} 
                    onChange={(event) => this.update(event.target.value)}
                      value = {this.state.query}/>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
  
            <Row>
              <Col>
                <ListGroup>
                  {markers.map((marker, id) => 
                    <ListGroupItem key={id} onClick={e => select(id)}>
                      {marker.title}
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
              <Button color="primary" onClick={back}>Back</Button>
            </Row>
            <Row>
              {markers[id].title}
            </Row>
          </Container>
        }
      </Collapse>
    );
  }
}

export default List;
