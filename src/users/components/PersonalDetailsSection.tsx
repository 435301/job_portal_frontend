import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import editIcon from "../../assets/img/edit.svg";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { updatePersonalDetails } from "../../redux/slices/employeeProfileSlice.tsx";
import { getAllMaritalStatus } from "../../redux/slices/maritalStatusSlice.tsx";
import { getAllCities } from "../../redux/slices/citiesSlice.tsx";
import { getAllAvailability } from "../../redux/slices/availabilitySlice.tsx";
import { getAllExperiences } from "../../redux/slices/experienceSlice.tsx";
import { getAllWorkPermit } from "../../redux/slices/WorkPermitSlice.tsx";

interface ProfileCardProps {
  personalDetails: any;
}

const PersonalDetailsSection: React.FC<ProfileCardProps> = ({ personalDetails }) => {
  console.log('personalDetails',personalDetails)
  const dispatch = useDispatch<AppDispatch>();
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const { maritalStatusList } = useSelector((state: RootState) => state.maritalStatus);
  const { CityList } = useSelector((state: RootState) => state.city);
  const { AvailabilityList } = useSelector((state: RootState) => state.availability);
  const { experienceList } = useSelector((state: RootState) => state.experience);
  const { WorkPermitList } = useSelector((state: RootState) => state.workPermit);
  console.log('experienceList', experienceList)

  useEffect(() => {
    dispatch(getAllMaritalStatus());
    dispatch(getAllCities());
    dispatch(getAllAvailability());
    dispatch(getAllExperiences());
    dispatch(getAllWorkPermit());
  }, [dispatch]);

  useEffect(() => {
    if (showModal && personalDetails) {
      setForm({
        firstName: personalDetails?.firstName || "",
        lastName: personalDetails?.lastName || "",
        genderId: personalDetails?.genderId || "",
        maritalStatusId: personalDetails?.maritalStatusId || "",
        dob: personalDetails?.dateOfBirth || "",
        cityId: personalDetails?.cityId || "",
        availabilityId: personalDetails?.availabilityId || "",
        experienceId: personalDetails?.experienceId || "",
        workPermitId: personalDetails?.workPermitId || "",
        workPermitCountries: personalDetails?.workPermitCountries || "",
        permanentAddress: personalDetails?.permanentAddress || "",
        homeTown: personalDetails?.homeTown || "",
        pincode: personalDetails?.pincode || "",
        nationality: personalDetails?.nationality || "",
        languages: personalDetails?.languageProficiency || "",
      });
    }
  }, [showModal, personalDetails]);


  const [form, setForm] = useState({
    firstName: personalDetails?.firstName || "",
    lastName: personalDetails?.lastName || "",
    genderId: personalDetails?.genderId || "",
    maritalStatusId: personalDetails?.maritalStatusId || "",
    dob: personalDetails?.dateOfBirth || "",
    cityId: personalDetails?.cityId || "",
    availabilityId: personalDetails?.availabilityId || "",
    experienceId: personalDetails?.experienceId || "",
    workPermitId: personalDetails?.workPermitId || "",
    workPermitCountries: personalDetails?.workPermitCountries || "",
    permanentAddress: personalDetails?.permanentAddress || "",
    homeTown: personalDetails?.homeTown || "",
    pincode: personalDetails?.pincode || "",
    nationality: personalDetails?.nationality || "",
    languages: personalDetails?.languageProficiency || "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    try {
      dispatch(updatePersonalDetails(form))
    } catch (err) {
      console.log(err)
    }
  };

  const handleMaritalSelect = (id: number) => {
    setForm({ ...form, maritalStatusId: id });
  };


  return (
    <div className="card-section personal-details">
      {/* ===== Header ===== */}
      <div className="section-header p-3 mb-0 d-flex justify-content-between align-items-center">
        <div>
          <i className="bi bi-person-lines-fill me-2"></i> Personal Details
        </div>
        {/* === Edit icon instead of Add details === */}
        <img
          src={editIcon}
          alt="Edit"
          className="edit-icons"
          style={{ width: "22px", height: "22px", cursor: "pointer" }}
          onClick={handleShow}
        />
      </div>


      {/* ===== Details Display ===== */}
      <div className="row p-3 names">
        <div className="col-md-3">
          <strong>Full Name:</strong>
          <div>{personalDetails?.firstName} {personalDetails?.lastName}</div>
        </div>
        <div className="col-md-3">
          <strong>Gender:</strong>
          <div>{personalDetails?.gender?.gender || "-"}</div>
        </div>
        <div className="col-md-3">
          <strong>Marital Status:</strong>
          <div>{personalDetails?.maritalStatus?.maritalStatus || "-"}</div>
        </div>
        <div className="col-md-3">
          <strong>DOB:</strong>
          <div>{personalDetails?.dateOfBirth || "-"}</div>
        </div>

        <div className="col-md-3">
          <strong>Locality:</strong>
          <div>{personalDetails?.city?.cityName || "-"}</div>
        </div>
        <div className="col-md-3">
          <strong>Availability:</strong>
          <div>{personalDetails?.availability?.availability || "-"}</div>
        </div>
        <div className="col-md-3">
          <strong>Experience:</strong>
          <div>{personalDetails?.experience?.experienceName || "-"}</div>
        </div>

        <div className="col-md-3">
          <strong>Work Permit for USA:</strong>
          <div>{personalDetails?.workPermit?.workPermit  || "-"}</div>
        </div>

        <div className="col-md-3">
          <strong>Work permit for other countries:</strong>
          <div>{personalDetails?.workPermitCountries || "-"}</div>
        </div>
        <div className="col-md-3">
          <strong>Address:</strong>
          <div>{personalDetails?.permanentAddress} - {personalDetails?.pincode}</div>
        </div>
        <div className="col-md-3">
          <strong>Nationality:</strong>
          <div>{personalDetails?.nationality}</div>
        </div>

        <div className="col-md-3">
          <strong>Languages:</strong>
          <div>{personalDetails?.languageProficiency}</div>
        </div>

        <div className="col-md-3">
          <strong>Mobile Number:</strong>
          <div>{personalDetails?.mobile || "-"}</div>
        </div>
        <div className="col-md-3">
          <strong>Email ID:</strong>
          <div>{personalDetails?.email || "-"}</div>
        </div>
      </div>

      {/* ===== Popup Modal ===== */}
      <Modal show={showModal} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title><i className="bi bi-person-lines-fill"></i> Personal details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-4">
              <Col md={6}>
                <Form.Label className="fw-bold">Full Name<span className="text-danger"> *</span></Form.Label>
                <Form.Control type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Enter your full name" />
              </Col>
            </Row>

            {/* ===== Gender ===== */}
            <div className="mb-4">
              <Form.Label className="fw-bold">Gender<span className="text-danger"> *</span></Form.Label>
              <div className="d-flex gap-3">
                <Form.Check inline label="Male" name="genderId" type="radio" value="1" checked={form.genderId == 1} onChange={handleChange} />
                <Form.Check inline label="Female" name="genderId" type="radio" value="2" checked={form.genderId == 2} onChange={handleChange} />
              </div>
            </div>

            {/* ===== Marital Status ===== */}
            <div className="mb-4">
              <Form.Label className="fw-bold">Marital status<span className="text-danger"> *</span></Form.Label>
              <div className="d-flex flex-wrap gap-2">
                {maritalStatusList?.map((item) => (
                  <Badge
                    key={item.id}
                    bg={form.maritalStatusId === item.id ? "dark" : "light"}
                    text={form.maritalStatusId === item.id ? "light" : "dark"}
                    className="border rounded-pill px-3 py-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleMaritalSelect(item.id)}
                  >
                    {item?.maritalStatus}
                  </Badge>
                ))}
              </div>
            </div>



            {/* ===== Date of Birth ===== */}
            <Row className="mb-4">
              <Col md={6}>
                <Form.Label className="fw-bold">Date of Birth<span className="text-danger"> *</span></Form.Label>
                <Form.Control type="date" name="dob" value={form.dob} onChange={handleChange} />
              </Col>
              <Col md={6}>
                <Form.Label className="fw-bold">Locality<span className="text-danger"> *</span></Form.Label>
                <Form.Select
                  name="cityId"
                  value={form.cityId}
                  onChange={handleChange}
                >
                  <option value="">Select city</option>
                  {CityList.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.cityName}
                    </option>
                  )
                  )}

                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Label className="fw-bold">Availability<span className="text-danger"> *</span></Form.Label>
                <Form.Select
                  name="availabilityId"
                  value={form.availabilityId}
                  onChange={handleChange}>
                  <option value="">Select availability</option>
                  {AvailabilityList.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.availability}
                    </option>
                  )
                  )}

                </Form.Select>
              </Col>
              <Col md={6}>
                <Form.Label className="fw-bold">Experience<span className="text-danger"> *</span></Form.Label>
                <Form.Select
                  name="experienceId"
                  value={form.experienceId}
                  onChange={handleChange}>
                  <option value="">Select experience</option>
                  {experienceList.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.experienceName}
                    </option>
                  )
                  )}
                </Form.Select>
              </Col>
            </Row>

            {/* ===== Work Permits ===== */}
            <Row className="mb-4">
              <Col md={6}>
                <Form.Label className="fw-bold">Work permit for USA</Form.Label>
                <Form.Select
                  name="workPermitId"
                  value={form.workPermitId}
                  onChange={handleChange}>
                  <option value="">Select work permit</option>
                  {WorkPermitList.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.workPermit}
                    </option>
                  )
                  )}
                </Form.Select>
              </Col>
              <Col md={6}>
                <Form.Label className="fw-bold">Work permit for other countries</Form.Label>
                <Form.Control type="text" placeholder="Enter countries (max 3)" name="workPermitCountries"
                  value={form.workPermitCountries}
                  onChange={handleChange} />
              </Col>
            </Row>

            {/* ===== Address and Location ===== */}
            <Row className="mb-4">
              <Col md={6}>
                <Form.Label className="fw-bold">Permanent address<span className="text-danger"> *</span></Form.Label>
                <Form.Control type="text" placeholder="Enter your permanent address" name="permanentAddress" value={form.permanentAddress} onChange={handleChange} />
              </Col>
              <Col md={3}>
                <Form.Label className="fw-bold">Hometown<span className="text-danger"> *</span></Form.Label>
                <Form.Control type="text" placeholder="Enter your home town" name="homeTown" value={form.homeTown} onChange={handleChange} />
              </Col>
              <Col md={3}>
                <Form.Label className="fw-bold">Pincode<span className="text-danger"> *</span></Form.Label>
                <Form.Control type="text" name="pincode" placeholder="Enter your picode" value={form.pincode} onChange={handleChange} />
              </Col>
            </Row>
            <Row className="mb-4">
              <Col md={6}>
                <Form.Label className="fw-bold">Nationality<span className="text-danger"> *</span></Form.Label>
                <Form.Control type="text" placeholder="Enter your nationality" name="nationality" value={form.nationality} onChange={handleChange} />
              </Col>
            </Row>


            {/* ===== Language Proficiency ===== */}
            <div className="mb-3">
              <Form.Label className="fw-bold">Language proficiency</Form.Label>
              <Form.Control
                type="text"
                placeholder="Add languages you know (e.g. English, Hindi, Telugu)"
                name="languages"
                value={form.languages}
                onChange={handleChange}
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="dark" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PersonalDetailsSection;
