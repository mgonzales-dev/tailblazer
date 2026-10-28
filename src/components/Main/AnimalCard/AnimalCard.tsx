import {Badge, Card, Col, Row} from "react-bootstrap";
import {type AnimalReport, ReportStatus} from "@models/Models";
import placeholder from "@assets/placeholder.svg";
import styles from "./AnimalCard.module.css";

function AnimalCard({
                      report,
                      onViewDetails,
                    }: {
  report: AnimalReport;
  onViewDetails: (report: AnimalReport) => void;
}) {
  return (
      <Col sm={12} md={6} lg={4} className="mb-4 d-flex">
        <Card
            className={`${styles.animalCard} w-100`}
            role="button"
            tabIndex={0}
            onClick={() => onViewDetails(report)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onViewDetails(report);
              }
            }}
        >
          <div className={styles.imageWrapper}>
            <Card.Img
                variant="top"
                src={report.imageUrl === "" ? placeholder : report.imageUrl}
                className={styles.cardImage}
            />
            <div className={styles.seeMore}>
              <span>View Details</span>
            </div>
          </div>

          <Card.Body className={styles.cardBody}>
            <Card.Title>
              <Row>
                <Col>
                  {report.name}
                </Col>
                <Col className="text-end">
                  <Badge pill className={styles.badgeSpacing}>
                    {report.type}
                  </Badge>
                  <Badge
                      pill
                      bg={report.status === ReportStatus.Lost ? "danger" : "success"}
                      className={styles.badgeSpacing}
                  >
                    {report.status}
                  </Badge>
                </Col>
              </Row>
            </Card.Title>

            <div className={`${styles.locationBox} small text-muted`}>
              <strong>Last Known Location</strong>
              <br/>
              {report.location.address}
            </div>

            <div className={styles.spacer}/>

            <span className="mt-2 align-self-end">
              <strong>Date Posted:</strong> {new Date(report.createdAt).toDateString()}
            </span>
          </Card.Body>
        </Card>
      </Col>
  );
}

export default AnimalCard;