import React, { Component } from 'react';
import {Row, Container, Col} from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core';

class Footer extends Component {
  render() {
    return (
      <footer className="bg-dark">
        <Container>
          <Row>
            <Col className="text-white" xs="6">
              © 2018  Jingyi Ding
            </Col>
            <Col className="text-white text-right" xs="3">
              <div>Contact Me:</div>
            </Col>
            <Col className="text-white text-left" xs="3" id="social">
              <a className="fab fa-linkedin text-white logo" href="https://www.linkedin.com/in/jingyiding/"></a>
              <a className="fab fa-github text-white logo" href="https://github.com/dingjy94"></a>
              <a className="far fa-envelope text-white logo" href="mailto:dingjy94@gmail.com"></a>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

export default Footer;