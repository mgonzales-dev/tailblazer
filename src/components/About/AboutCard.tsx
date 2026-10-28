import {Card, Container, Row, Col} from "react-bootstrap";

function AboutCard() {
  return (
      <Container className="my-4">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8} xl={6}>
            <Card>
              <Card.Header as="h3">About this site</Card.Header>
              <Card.Body>
                <Card.Text as="p">
                  TailBlazer is a lost animal reporting web application built with
                  React, TypeScript, semantic HTML5, React Bootstrap, and Leaflet.
                  Users can create public lost animal reports, browse active cases on
                  a map and in a gallery, and update reports when an animal has been found.
                </Card.Text>

                <ul>
                  <li>React components and hooks are used to organize the content.</li>
                  <li>Leaflet is used to let users choose and view last-known locations on a map.
                  </li>
                  <li>JSONbin and ImgBB are used with async/await to save report data and host
                    uploaded images.
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
  );
}

export default AboutCard;