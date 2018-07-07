import React, {Component} from 'react';
import {Navbar, NavbarBrand, Collapse, Button, NavItem, Nav, Row, Container,
        Form, FormGroup, Input, Col} from 'reactstrap';

class Bar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      collapsed: false
    };
  }

  toggle() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <div>
      <Navbar className="navbar navbar-expand-md navbar-dark bg-primary">
          <Container>
            <Col className="text-left">
              <Nav>
                <NavItem>
                  <Button color="primary" onClick={this.toggle}>Search</Button>
                </NavItem>
              </Nav>
            </Col>
            <Col className="text-right">
              <NavbarBrand href="/" className="mr-auto">Neighboorhood Map</NavbarBrand>
            </Col>
          </Container>
      </Navbar>

      <Collapse isOpen={this.state.collapsed} className="bg-primary"> 
        <Form>
          <FormGroup>
            <Input placeholder="Search Neighboorhood Map"/>
          </FormGroup>
        </Form>
      </Collapse>
      </div>
    );
  }
}

export default Bar;