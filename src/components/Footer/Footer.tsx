import {Col, Container, Row} from "react-bootstrap";
import logo from "@assets/logo-white.svg"
import "./Footer.css"

function Footer() {
  return (
      <footer className="border-top py-3 mt-auto">
        <Container>
          <Row className="justify-content-center align-items-center text-center">
            <Col xs="auto">
              <div className="footer-head text">
                <img alt="TailBlazer Logo" className="footer-logo" src={logo}/>
              </div>
              <p className="mb-1">&copy; Michael Gonzales</p>
              <p className="mb-0">Assignment 4: TailBlazer — Lost Animal Reporting System
                (React)</p>
            </Col>
          </Row>
        </Container>
      </footer>
  );
}

export default Footer;