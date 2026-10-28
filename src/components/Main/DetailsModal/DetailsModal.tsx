import {Modal, Button, Form, Row, Col, Badge, Table} from "react-bootstrap";
import type {AnimalReport} from "@models/Models";
import {ReportStatus} from "@models/Models";
import {useMarkReportFound} from "@hooks/Hooks";
import placeholder from "@assets/placeholder.svg";
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import styles from "./DetailsModal.module.css";

function DetailsModal({
                        report,
                        onClose,
                        onUpdate,
                      }: {
  report: AnimalReport;
  onClose: () => void;
  onUpdate: () => Promise<void> | void;
}) {
  const {
    password,
    setPassword,
    showPasswordInput,
    setShowPasswordInput,
    isSubmitting,
    error,
    handleMarkFound,
  } = useMarkReportFound({report, onClose, onUpdate});

  return (
      <Modal size="lg" show={true} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {report.name} <Badge pill className={styles.badgeSpacing}>{report.type}</Badge>
            <Badge pill bg={report.status === ReportStatus.Lost ? "danger" : "success"}
                   className={styles.badgeSpacing}>{report.status}</Badge>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className={styles.modalBody}>
          <Row className={styles.topRow}>

            <Col md={6}>
              <img
                  src={report.imageUrl === "" ? placeholder : report.imageUrl}
                  alt={report.name}
                  className={styles.image}
              />
            </Col>

            <Col md={6}>
              <Table borderless size="sm" className={styles.infoTable}>
                <tbody>
                <tr>
                  <td className={styles.label}>Date Posted:</td>
                  <td>{new Date(report.createdAt).toDateString()}</td>
                </tr>
                <tr>
                  <td className={styles.label}>Contact:</td>
                  <td>{report.contact.contactName}</td>
                </tr>
                <tr>
                  <td className={styles.label}>Phone:</td>
                  <td>{report.contact.contactPhone}</td>
                </tr>
                <tr>
                  <td className={styles.label}>Email:</td>
                  <td>{report.contact.contactEmail}</td>
                </tr>
                </tbody>
              </Table>
            </Col>

          </Row>

          <h5 className={styles.sectionHeading}>Description</h5>
          <div className={styles.descriptionBox}>
            {report.description || "No description provided."}
          </div>

          <div className={styles.sectionDivider}/>

          <div className={styles.mapWrapper}>
            <MapContainer
                center={[report.location.lat, report.location.lng]}
                zoom={12}
                style={{height: "300px", width: "100%"}}
            >
              <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[report.location.lat, report.location.lng]}/>
            </MapContainer>
          </div>
          <div className={styles.locationText}>
            <strong>Last Seen:</strong> {report.location.address}
          </div>

          <div className={styles.sectionDivider}/>

          {report.status === ReportStatus.Lost ? (
              <div className={styles.actionSection}>
                <p className={styles.ownerText}>
                  Are you the owner?
                </p>

                {!showPasswordInput ? (
                    <Button
                        onClick={() => setShowPasswordInput(true)}
                    >
                      Mark as Found
                    </Button>
                ) : (
                    <>
                      <div>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && (
                            <div className="text-danger mt-1 small">
                              {error}
                            </div>
                        )}
                      </div>

                      <Button
                          onClick={handleMarkFound}
                          disabled={isSubmitting}
                      >
                        {isSubmitting ? "Submitting..." : "Submit"}
                      </Button>
                    </>
                )}
              </div>
          ) : (
              <div className={styles.actionSection}>
                <p className={styles.ownerText}>
                  {report.name} has been found!
                </p>
              </div>
          )}
        </Modal.Body>
      </Modal>
  );
}

export default DetailsModal;