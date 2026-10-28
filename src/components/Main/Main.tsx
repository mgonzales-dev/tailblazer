import {useState} from "react";
import {type AnimalReport, AnimalType, ReportStatus} from "@models/Models";
import {AnimalCard, CreateReportModal, DetailsModal, SuccessModal} from "@components/Components";
import {useReportFilters, useReports} from "@hooks/Hooks";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {Alert, Button, Col, Container, Form, Row, Spinner} from "react-bootstrap";
import placeholder from "@assets/placeholder.svg";
import styles from "./Main.module.css";

function Main({showCreateModal, setShowCreateModal}: {
  showCreateModal: boolean;
  setShowCreateModal: (value: boolean) => void;
}) {
  const {reports, loading, error, reloadReports} = useReports();
  const [selectedReport, setSelectedReport] = useState<AnimalReport | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const {
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    filteredReports,
    mapReports,
  } = useReportFilters(reports);
  const defaultCenter: [number, number] = [49.18, -122.95];

  return (
      <Container className={styles.mainContainer}>
        {error && <Alert variant="danger">{error}</Alert>}
        <h2 className="my-4">Map</h2>
        <section className={styles.mapSection}>
          <div className={styles.mapFrame}>
            {loading ? (
                    <div className="text-center my-3">
                      <Spinner animation="border"/>
                    </div>
                ) :
                (
                    <MapContainer
                        center={defaultCenter}
                        zoom={10}
                        style={{height: "50vh"}}
                    >
                      <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />

                      {mapReports.map((report) => (
                          <Marker
                              key={report.id}
                              position={[report.location.lat, report.location.lng]}
                          >
                            <Popup>
                              <h5 className={styles.popupTitle}>{report.name}</h5>
                              <img
                                  src={report.imageUrl === "" ? placeholder : report.imageUrl}
                                  alt={report.name}
                                  className={styles.popupImage}
                              />
                              <div className="small">
                                <strong>Type:</strong> {report.type}
                                <br/>
                                <strong>Contact:</strong> {report.contact.contactName}
                                <br/>
                                <strong>Phone:</strong> {report.contact.contactPhone}
                                <br/>
                                <strong>Email:</strong> {report.contact.contactEmail}
                              </div>

                              <Button
                                  className={styles.popupButton}
                                  size="sm"
                                  onClick={() => setSelectedReport(report)}
                              >
                                View Details
                              </Button>
                            </Popup>
                          </Marker>
                      ))}
                    </MapContainer>)}
          </div>
        </section>

        <hr/>

        <section className={styles.filterSection}>
          <h2 className="my-4">Gallery</h2>

          <Row className="g-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Filter by Status</Form.Label>
                <Form.Select
                    value={statusFilter}
                    onChange={(e) =>
                        setStatusFilter(e.target.value as "all" | ReportStatus)
                    }
                >
                  <option value="all">All</option>
                  <option value={ReportStatus.Lost}>Lost</option>
                  <option value={ReportStatus.Found}>Found</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Filter by Animal Type</Form.Label>
                <Form.Select
                    value={typeFilter}
                    onChange={(e) =>
                        setTypeFilter(e.target.value as "all" | AnimalType)
                    }
                >
                  <option value="all">All</option>
                  <option value={AnimalType.Dog}>Dog</option>
                  <option value={AnimalType.Cat}>Cat</option>
                  <option value={AnimalType.Bird}>Bird</option>
                  <option value={AnimalType.Rabbit}>Rabbit</option>
                  <option value={AnimalType.Other}>Other</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </section>

        {loading && (
            <div className="text-center my-4">
              <Spinner animation="border"/>
            </div>
        )}

        <Row className="mt-4">
          {filteredReports.length === 0 && (
              <Col xs={12}>
                <div className={styles.emptyState}>
                  <h5>No reports match your filters.</h5>
                </div>
              </Col>
          )}

          {filteredReports.map((report) => (
              <AnimalCard
                  key={`${statusFilter}-${typeFilter}-${report.id}`}
                  report={report}
                  onViewDetails={setSelectedReport}
              />
          ))}
        </Row>

        {selectedReport && (
            <DetailsModal
                report={selectedReport}
                onClose={() => setSelectedReport(null)}
                onUpdate={reloadReports}
            />
        )}

        <CreateReportModal
            show={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            onCreated={async () => {
              await reloadReports();
              setShowSuccessModal(true);
            }}
        />

        <SuccessModal
            show={showSuccessModal}
            onClose={() => setShowSuccessModal(false)}
        />
      </Container>
  );
}

export default Main;