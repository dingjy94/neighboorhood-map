import React, {Component} from 'react';
import {Navbar, Button, Container, Col} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Bar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const toggle = this.props.toggle;

    return (
      <Navbar className="navbar navbar-expand-md navbar-dark bg-dark">
          <Container>
            <Col xs="8">
                  <Button color="dark" onClick={toggle}>
                    <FontAwesomeIcon icon="search"/>
                  </Button>
            </Col> 
          </Container>
      </Navbar>
    );
  }
}

export default Bar;