import {Modal, Button, Form, Row, Col} from "react-bootstrap";
import {
  type ChangeEvent,
} from "react";
import {AnimalType} from "@models/Models";
import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import {useCreateReportForm, useImagePreviewUrl} from "@hooks/Hooks";
import placeholder from "@assets/placeholder.svg";
import styles from "./CreateReportModal.module.css";

function LocationPicker({
                          onPick,
                        }: {
  onPick: (lat: number, lng: number) => void;
}) {
  const map = useMap();

  useMapEvents({
    click(e) {
      map.flyTo(e.latlng, 12);
      onPick(e.latlng.lat, e.latlng.lng);
    },
  });

  return null;
}

function CreateReportModal({
                             show,
                             onClose,
                             onCreated,
                           }: {
  show: boolean;
  onClose: () => void;
  onCreated: () => Promise<void> | void;
}) {
  const {
    form,
    setForm,
    isSubmitting,
    validated,
    inputFile,
    handleSubmit,
    handleMapPick,
    handleReset,
    handleClose,
  } = useCreateReportForm({show, onClose, onCreated});

  const previewUrl = useImagePreviewUrl(form.imageFile, placeholder);

  return (
      <Modal show={show} onHide={handleClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title>Create Report</Modal.Title>
        </Modal.Header>

        <Modal.Body className={styles.modalBody}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className={styles.layoutRow}>
              <Col md={7} className={styles.formColumn}>
                <h5 className={styles.sectionTitle}>Animal Information</h5>

                <Form.Group className="mb-2">
                  <Form.Label>Animal Name</Form.Label>
                  <Form.Control
                      required
                      placeholder="Animal Name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({...form, name: e.target.value})}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter the animal&apos;s name.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Animal Type</Form.Label>
                  <Form.Select
                      required
                      value={form.type}
                      onChange={(e) =>
                          setForm({...form, type: e.target.value as AnimalType})
                      }
                  >
                    {Object.values(AnimalType).map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                      type="file"
                      ref={inputFile}
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setForm({
                            ...form,
                            imageFile:
                                e.target.files && e.target.files.length > 0
                                    ? e.target.files[0]
                                    : null,
                          })
                      }
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Description"
                      value={form.description}
                      onChange={(e) =>
                          setForm({...form, description: e.target.value})
                      }
                  />
                </Form.Group>

                <h5 className={styles.sectionTitle}>Contact Information</h5>

                <Form.Group className="mb-2">
                  <Form.Label>Contact Name</Form.Label>
                  <Form.Control
                      required
                      placeholder="Contact Name"
                      type="text"
                      value={form.contact.contactName}
                      onChange={(e) =>
                          setForm({
                            ...form,
                            contact: {...form.contact, contactName: e.target.value},
                          })
                      }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a contact name.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                      required
                      placeholder="123-456-7890"
                      pattern="([0-9]+(-[0-9]+)+)"
                      type="tel"
                      value={form.contact.contactPhone}
                      onChange={(e) =>
                          setForm({
                            ...form,
                            contact: {...form.contact, contactPhone: e.target.value},
                          })
                      }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid phone number. (eg. ###-###-####)
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                      required
                      placeholder="Email"
                      type="email"
                      value={form.contact.contactEmail}
                      onChange={(e) =>
                          setForm({
                            ...form,
                            contact: {...form.contact, contactEmail: e.target.value},
                          })
                      }
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid email address.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mt-2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                      required
                      placeholder="Password"
                      type="password"
                      value={form.password}
                      onChange={(e) => setForm({...form, password: e.target.value})}
                  />
                  <Form.Text muted>
                    Password will be used to verify when animal has been found.
                  </Form.Text>
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid password.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={5} className={styles.previewColumn}>
                <h5 className={styles.sectionTitle}>Preview Image</h5>
                <img
                    src={previewUrl}
                    alt="Preview"
                    className={styles.previewImage}
                />

                <h5 className={styles.sectionTitle}>Location</h5>

                <Form.Group className="mb-3">
                  <Form.Label hidden>Select Location</Form.Label>
                  <Form.Text muted>
                    Click on the map to mark where the animal was last seen.
                  </Form.Text>

                  <div
                      className={`${styles.mapWrapper} ${
                          validated && (form.location.lat === null || form.location.lng === null)
                              ? styles.mapError
                              : ""
                      }`}
                  >
                    <MapContainer
                        center={[49.18, -122.95]}
                        zoom={10}
                        style={{height: "300px", width: "100%"}}
                    >
                      <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <LocationPicker onPick={handleMapPick}/>
                      {form.location.lat !== null && form.location.lng !== null && (
                          <Marker position={[form.location.lat, form.location.lng]}>
                            <Popup>
                              Latitude: {form.location.lat.toFixed(2)}
                              <br/>
                              Longitude: {form.location.lng.toFixed(2)}
                            </Popup>
                          </Marker>
                      )}
                    </MapContainer>
                  </div>

                  {validated && (form.location.lat === null || form.location.lng === null) && (
                      <div className="invalid-feedback d-block">
                        Please select a location on the map.
                      </div>
                  )}
                </Form.Group>

                {form.location.address && (
                    <div className={styles.locationBox}>
                      <strong>Location</strong>
                      <div className="small text-muted">
                        {form.location.address}
                      </div>
                    </div>
                )}
              </Col>
            </Row>

            <div className={styles.buttonRow}>
              <Button variant="outline-secondary" type="button" onClick={handleReset}>
                Reset Form
              </Button>

              <Button variant="secondary" type="button" onClick={handleClose}>
                Cancel
              </Button>

              <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="success"
              >
                {isSubmitting ? "Submitting..." : "Submit Report"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
  );
}

export default CreateReportModal;