import React, {Component} from 'react';
import {Navbar, NavbarBrand, Collapse, Button, NavItem, Nav, Row, Container,
        Form, FormGroup, Input, Col} from 'reactstrap';

class Bar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const toggle = this.props.toggle;

    return (
      <Navbar className="navbar navbar-expand-md navbar-dark bg-primary">
          <Container>
            <Col className="float-left">
              <Nav>
                <NavItem>
                  <Button color="primary" onClick={toggle}>Search</Button>
                </NavItem>
              </Nav>
            </Col>
          </Container>
      </Navbar>
    );
  }
}

export default Bar;