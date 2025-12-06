import React, { FormEvent, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "animate.css";
import "../assets/css/style.css";
import CareerBreakPopup from "./components/CareerBreakPopup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useAppSelector } from "../redux/hooks.tsx";
import { AppDispatch, RootState } from "../redux/store.tsx";
import { useDispatch } from "react-redux";
import { getAllSkills } from "../redux/slices/skillSlice.tsx";
import { getAllEmploymentType } from "../redux/slices/employementTypeSlice.tsx";
import { getAllRole } from "../redux/slices/RoleSlice.tsx";
import SearchableSelect from "../components/SearchableSelect.tsx";
import { CandidateRequirementForm, FormErrors, FormErrorsEmployment, JobDetailsForm, JobTimingsForm, validateCandidateRequirementsForm, validateJobDetailsForm, validateJobTimingsForm } from "../common/validation.tsx";
import { getAllCities } from "../redux/slices/citiesSlice.tsx";
import { getAllWorkLocationType } from "../redux/slices/WorkLocationTypeSlice.tsx";
import { addCandidateRequirement, addJobDetails, addWorkTimings } from "../redux/slices/jobDetailsSlice.tsx";
import { Form } from "react-bootstrap";
import { getAllEducations } from "../redux/slices/educationSlice.tsx";
import { getAllGender } from "../redux/slices/genderSlice.tsx";
import { getAllHiringTimeline } from "../redux/slices/hiringTimelineSlice.tsx";
import SearchableSelectMulti from "../components/SearchableSelectMutli.tsx";
import TextArea from "../components/TextArea.tsx";
import { useNavigate } from "react-router-dom";


const JobDetails = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const employerId = JSON.parse(localStorage.getItem("employer") ?? "{}")?.id;
    const { skillList } = useAppSelector((state: RootState) => state.skill);
    const { EmploymentTypeList } = useAppSelector((state: RootState) => state.employmentType);
    const { RoleList } = useAppSelector((state: RootState) => state.role);
    const { CityList } = useAppSelector((state: RootState) => state.city);
    const { WorkLocationTypeList } = useAppSelector((state: RootState) => state.workLocationType);
    const { experienceList } = useAppSelector((state: RootState) => state.experience);
    const { educationList } = useAppSelector((state: RootState) => state.education);
    const { genderList } = useAppSelector((state: RootState) => state.gender);
    const { HiringTimelineList } = useAppSelector((state: RootState) => state.hiringTimeline);
    const [activeTab, setActiveTab] = useState("basic");
    const [jobType, setJobType] = useState("Full time");
    const [errors, setErrors] = useState<FormErrorsEmployment>({});
    const { jobData } = useAppSelector((state: RootState) => state.job);
    const jobId = jobData?.id;

    const roleOptions = RoleList.map((item: any) => ({
        value: item.id,
        label: item.role,
    }));

    const cityOptions = CityList.map((item: any) => ({
        value: item.id,
        label: item.cityName,
    }));
    const workLocationOptions = WorkLocationTypeList.map((item: any) => ({
        value: item.id,
        label: item.workLocationType,
    }));
    const SkillOptions = skillList.map((item: any) => ({
        value: item.id,
        label: item.skillName,
    }))
    const [formData, setFormData] = useState({
        employmentTypeId: 0,
        jobTitle: "",
        jobRoleId: 0,
        cityId: 0,
        workLocationTypeId: 0,
        noOfOpenings: 0,
        minExpId: 0,
        maxExpId: 0,
        educationId: 0,
        genderId: 0,
        hiringTimelineId: 0,
        minSalary: 0,
        maxSalary: 0,
        skillIds: [] as number[],
        jobDescription: "",
        timings: "",
    });

    const handleRefresh = () => {
        setFormData({
            employmentTypeId: 0,
            jobTitle: "",
            jobRoleId: 0,
            cityId: 0,
            workLocationTypeId: 0,
            noOfOpenings: 0,
            minExpId: 0,
            maxExpId: 0,
            educationId: 0,
            genderId: 0,
            hiringTimelineId: 0,
            minSalary: 0,
            maxSalary: 0,
            skillIds: [] as number[],
            jobDescription: "",
            timings: "",
        })
        setErrors({});
    }


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (employerId) {
            dispatch(getAllSkills());
            dispatch(getAllEmploymentType());
            dispatch(getAllRole());
            dispatch(getAllCities());
            dispatch(getAllWorkLocationType());
            dispatch(getAllEducations());
            dispatch(getAllGender());
            dispatch(getAllHiringTimeline());
        }
    }, [dispatch, employerId]);

    useEffect(() => {
        if (jobData) {
            setFormData(prev => ({
                ...prev,
                employmentTypeId: jobData.employmentTypeId ?? prev.employmentTypeId,
                jobTitle: jobData.jobTitle ?? prev.jobTitle,
                jobRoleId: jobData.jobRoleId ?? prev.jobRoleId,
                cityId: jobData.jobCityId ?? prev.cityId,        // map key
                workLocationTypeId: jobData.workLocationTypeId ?? prev.workLocationTypeId,
                noOfOpenings: jobData.noOfOpenings ?? prev.noOfOpenings,
                minExpId: Number(jobData.minExpId) ?? prev.minExpId,
                maxExpId: Number(jobData.maxExpId) ?? prev.maxExpId,
                educationId: jobData.educationId ?? prev.educationId,
                genderId: jobData.genderId ?? prev.genderId,
                hiringTimelineId: jobData.hiringTimelineId ?? prev.hiringTimelineId,
                minSalary: jobData.minSalary ?? prev.minSalary,
                maxSalary: jobData.maxSalary ?? prev.maxSalary,
                skillIds: jobData.skillIds ?? prev.skillIds,
                jobDescription: jobData.jobDescription ?? prev.jobDescription,
                timings: jobData.timings ?? prev.timings,
            }));
            setJobType(jobData.employmentType?.employmentType || "Full time");
        }
    }, [jobData]);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        const parsedValue = e.target.type === "number" && value !== "" ? Number(value) : value;
        setFormData(prev => ({ ...prev, [name]: parsedValue }));
        setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const handleSelectChange = (name: string, value: any) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: "" }));
    };

    const handleSave = (e: FormEvent) => {
        e.preventDefault();
        let validationErrors = {};
        if (activeTab === "basic") {
            validationErrors = validateJobDetailsForm(formData);
        }
        if (activeTab === "candidate") {
            validationErrors = validateCandidateRequirementsForm(formData);
        }
        if (activeTab === "timings") {
            validationErrors = validateJobTimingsForm(formData);
        }
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        if (activeTab === "basic") {
            dispatch(
                addJobDetails({
                    employmentTypeId: formData?.employmentTypeId,
                    jobTitle: formData.jobTitle,
                    jobRoleId: formData?.jobRoleId,
                    cityId: formData?.cityId,
                    workLocationTypeId: formData?.workLocationTypeId,
                    noOfOpenings: formData?.noOfOpenings
                })
            );
            setActiveTab("candidate");
            return;
        }
        if (activeTab === "candidate") {
            dispatch(
                addCandidateRequirement({
                    jobId: jobId,
                    payload: {
                        minExpId: formData.minExpId,
                        maxExpId: formData.maxExpId,
                        educationId: formData.educationId,
                        genderId: formData.genderId,
                        hiringTimelineId: formData.hiringTimelineId,
                        minSalary: formData.minSalary,
                        maxSalary: formData.maxSalary,
                        skillIds: formData.skillIds,
                        jobDescription: formData.jobDescription,
                    },
                })
            );
            setActiveTab("timings")
            return;
        }
        if (activeTab === "timings") {
            dispatch(
                addWorkTimings({
                    jobId: jobId,
                    timings: formData.timings,
                })
            );
            handleRefresh();
            navigate("/job-posting")
        }
    };

    return (
        <>
            {/* ====== Navbar ====== */}
            <div className="container-fluid header position-relative overflow-hidden p-0">
                <Navbar />
                <div className="container-fluid bg-breadcrumb py-5"></div>
            </div>

            {/* ====== Job Details Card ====== */}
            <div className="container my-5 job-crm">
                <Form onSubmit={handleSave}>
                    <div
                        className=" rounded-4 border">
                        {/* 🔹 Tabs Header */}
                        <div className="d-flex rounded justify-content-between align-items-center mb-4 p-4 pb-3" style={{
                            background: "linear-gradient(to bottom, #E5F5FA, #ffffff)",

                        }}>
                            <div className="d-flex gap-4 flex-wrap">
                                <div
                                    className={`fw-semibold pb-2 me-4 ${activeTab === "basic"
                                        ? "text-primary border-bottom border-primary"
                                        : ""
                                        }`}
                                    role="button"
                                    onClick={() => setActiveTab("basic")}
                                >
                                    <i className="bi bi-briefcase-fill me-2"></i>Basic Job Details
                                </div>
                                <div
                                    className={`fw-semibold pb-2 me-4 ${activeTab === "candidate"
                                        ? "text-primary border-bottom border-primary"
                                        : ""
                                        }`}
                                    role="button"
                                    onClick={() => setActiveTab("candidate")}
                                >
                                    <i className="bi bi-person-badge me-2"></i>Candidate Requirement
                                </div>
                                <div
                                    className={`fw-semibold pb-2 me-4 ${activeTab === "timings"
                                        ? "text-primary border-bottom border-primary"
                                        : ""
                                        }`}
                                    role="button"
                                    onClick={() => setActiveTab("timings")}
                                >
                                    <i className="bi bi-clock-history me-2"></i>Timings
                                </div>

                            </div>
                        </div>
                        {/* ====== Tab Content ====== */}
                        <div className="row px-4">
                            {/* TAB 1 — Basic Job Details */}
                            {activeTab === "basic" && (
                                <div className="animate__animated animate__fadeIn col-lg-6">
                                    {/* Job Type */}
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">Job Type?</label>
                                        <div className="d-flex gap-3 flex-wrap">
                                            {EmploymentTypeList.map((item) => (
                                                <button
                                                    type="button"
                                                    key={item.employmentType}
                                                    className={`btn ${jobType === item.employmentType
                                                        ? "btn-primary"
                                                        : "btn-outline-secondary"
                                                        } rounded-pill px-4 py-2 d-flex align-items-center gap-2`}
                                                    onClick={() => {
                                                        setJobType(item.employmentType);
                                                        handleChange({
                                                            target: { name: "employmentTypeId", value: item.id }
                                                        });
                                                    }}

                                                    value={formData.employmentTypeId}
                                                >
                                                    {/* <i className={`bi ${item.icon}`}></i> */}
                                                    {item.employmentType}
                                                </button>
                                            ))}
                                            {errors.employmentTypeId && <div className="invalid-feedback d-block">{errors.employmentTypeId}</div>}
                                        </div>
                                    </div>

                                    {/* Job Title */}
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">Job Title</label>
                                        <input
                                            type="text"
                                            name="jobTitle"
                                            className={`form-control rounded-3 ${errors.jobTitle ? "is-invalid" : ""}`}
                                            placeholder="Job Title"
                                            value={formData.jobTitle}
                                            onChange={handleChange}

                                        />
                                        {errors.jobTitle && <div className="invalid-feedback">{errors.jobTitle}</div>}
                                    </div>

                                    {/* Job Role / Area of Work */}
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">
                                            Job Role / Area of Work
                                        </label>
                                        <SearchableSelect
                                            name="jobRoleId"
                                            options={roleOptions}
                                            value={formData.jobRoleId}
                                            onChange={handleChange}
                                            placeholder="Select role"
                                            error={errors.jobRoleId}
                                        />
                                    </div>

                                    {/* Job Location */}
                                    <div className="mb-4">
                                        <label className="form-label fw-semibold">Job Location</label>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <SearchableSelect
                                                    name="cityId"
                                                    options={cityOptions}
                                                    value={formData?.cityId}
                                                    onChange={handleChange}
                                                    placeholder="Select city"
                                                    error={errors?.cityId}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <SearchableSelect
                                                    name="workLocationTypeId"
                                                    options={workLocationOptions}
                                                    value={formData?.workLocationTypeId}
                                                    onChange={handleChange}
                                                    placeholder="Select Work Location Type"
                                                    error={errors?.workLocationTypeId}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* No. of Openings */}
                                    <div className="mb-4 row">
                                        <div className="col-lg-6">
                                            <label className="form-label fw-semibold">
                                                No. of Openings
                                            </label>
                                            <input
                                                type="number"
                                                name="noOfOpenings"
                                                value={formData.noOfOpenings}
                                                className="form-control rounded-3"
                                                onChange={handleChange}

                                            />
                                        </div>
                                        <div className="col-lg-6 can-list">
                                            <div className="d-flex align-items-center gap-2 mt-4 pt-2">
                                                <button
                                                    type="button"
                                                    className="btn btn-light rounded-circle"
                                                      onClick={() => {
                                                        const newValue = Math.max((formData.noOfOpenings || 0) - 1, 0);
                                                        handleChange({
                                                            target: { name: "noOfOpenings", value: newValue }
                                                        });
                                                    }}
                                                >
                                                    −
                                                </button>
                                                <button
                                                    type="button"
                                                    className="btn btn-light rounded-circle"
                                                   onClick={() => {
                                                        const newValue = (formData.noOfOpenings || 0) + 1;
                                                        handleChange({
                                                            target: { name: "noOfOpenings", value: newValue }
                                                        });
                                                    }}
                                                >
                                                    +
                                                </button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}


                            {/* ✅ TAB 2 — Candidate Requirement */}
                            {activeTab === "candidate" && (
                                <div className="animate__animated animate__fadeIn row req">
                                    <h5 className="fw-semibold mb-3">Candidate Requirement</h5>

                                    {/* Total Experience */}
                                    <div className="mb-3 col-lg-8">
                                        <label className="form-label fw-semibold">Total Experience of Candidate</label>
                                    </div>

                                    {/* Experience */}
                                    <div className="row mb-3">
                                        <div className="col-md-4">
                                            <label className="form-label fw-semibold">Minimum Experience</label>
                                            <input
                                                type="number"
                                                name="minExpId"
                                                placeholder="Enter the min experience"
                                                value={formData?.minExpId ?? ""}
                                                onChange={handleChange}
                                                className={`form-control rounded-3 ${errors.minExpId ? "is-invalid" : ""}`}
                                            />
                                            {errors.minExpId && <div className="invalid-feedback">{errors.minExpId}</div>}
                                        </div>

                                        <div className="col-md-4">
                                            <label className="form-label fw-semibold">Maximum Experience</label>
                                            <input
                                                type="number"
                                                name="maxExpId"
                                                placeholder="Enter the max experience"
                                                value={formData?.maxExpId ?? ""}
                                                onChange={handleChange}
                                                className={`form-control rounded-3 ${errors.maxExpId ? "is-invalid" : ""}`}
                                            />
                                            {errors.maxExpId && <div className="invalid-feedback">{errors.maxExpId}</div>}
                                        </div>
                                    </div>

                                    {/* Qualification */}
                                    <div className="mb-3">
                                        <label className="form-label fw-semibold">Minimum Qualification</label>
                                        <div className="d-flex flex-wrap gap-2">
                                            {educationList.map((item: any) => (
                                                <button
                                                    key={item.id}
                                                    type="button"
                                                    className={`btn btn-sm rounded-pill ${formData.educationId === item.id ? "btn-primary" : "btn-outline-secondary"
                                                        } ${errors.educationId ? "is-invalid" : ""}`}
                                                    onClick={() => handleSelectChange("educationId", item.id)}
                                                >
                                                    {item.educationName}
                                                </button>
                                            ))}
                                        </div>
                                        {errors.educationId && <div className="invalid-feedback d-block">{errors.educationId}</div>}
                                    </div>

                                    {/* Hiring Timeline */}
                                    <div className="col-12 mb-3 req">
                                        <label className="form-label fw-semibold">How soon do you want to fill the position?</label>
                                        <div className="d-flex flex-wrap gap-2">
                                            {HiringTimelineList.map((item: any) => (
                                                <button
                                                    key={item.id}
                                                    type="button"
                                                    className={`btn btn-sm rounded-pill ${formData.hiringTimelineId === item.id ? "btn-primary" : "btn-outline-secondary"} ${errors.hiringTimelineId ? "is-invalid" : ""}`}
                                                    onClick={() => handleSelectChange("hiringTimelineId", item.id)}
                                                >
                                                    {item?.title}
                                                </button>
                                            ))}
                                        </div>
                                        {errors.hiringTimelineId && <div className="invalid-feedback d-block">{errors.hiringTimelineId}</div>}
                                    </div>

                                    {/* Salary Range */}
                                    <div className="row mb-3 align-items-center">
                                        <label className="form-label fw-semibold">Monthly In-hand Salary(USD)</label>

                                        <div className="col-md-4">
                                            <input
                                                type="number"
                                                name="minSalary"
                                                className={`form-control rounded-3 ${errors.minSalary ? "is-invalid" : ""}`}
                                                placeholder="Enter the min salary"
                                                value={formData?.minSalary ?? ""}
                                                onChange={handleChange}
                                            />
                                            {errors.minSalary && <div className="invalid-feedback">{errors.minSalary}</div>}
                                        </div>

                                        <div className="col-md-1 m-0">to</div>

                                        <div className="col-md-4 m-0 p-0">
                                            <input
                                                type="number"
                                                name="maxSalary"
                                                className={`form-control rounded-3 ${errors.maxSalary ? "is-invalid" : ""}`}
                                                placeholder="Enter the max salary"
                                                value={formData?.maxSalary ?? ""}
                                                onChange={handleChange}
                                            />
                                            {errors.maxSalary && <div className="invalid-feedback">{errors.maxSalary}</div>}
                                        </div>
                                    </div>



                                    {/* Skills */}
                                    <div className="mb-3 row">
                                        <div className="col-lg-6">
                                            <label className="form-label fw-semibold">Skills</label>
                                            {/* If SearchableSelect returns an array of ids for multi-select, pass it directly to handleSelectChange */}
                                            <SearchableSelectMulti
                                                name="skillIds"
                                                options={SkillOptions}
                                                value={formData?.skillIds}
                                                onChange={(val: any) => handleSelectChange("skillIds", val)}
                                                placeholder="Select skills"
                                            />

                                            {errors.skillIds && <div className="invalid-feedback d-block">{errors.skillIds}</div>}
                                        </div>
                                    </div>
                                    <div className="mb-3 row" >
                                        <TextArea
                                            label="Job Description"
                                            name="jobDescription"
                                            value={formData.jobDescription}
                                            placeholder="Describe the job role..."
                                            rows={7}
                                            // required
                                            onChange={handleChange}
                                            error={errors.jobDescription}
                                        />
                                    </div>
                                </div>

                            )}


                            {/* ✅ TAB 3 — Timings */}
                            {activeTab === "timings" && (
                                <div className="animate__animated animate__fadeIn row">
                                    <h5 className="fw-semibold mb-3">Job Timings</h5>
                                    <div className="mb-5 col-lg-5">
                                        <label className="form-label">Working Hours</label>
                                        <input
                                            type="text"
                                            name="timings"
                                            className={`form-control rounded-3 ${errors.timings ? "is-invalid" : ""}`}
                                            placeholder="e.g., 9:00 AM - 6:00 PM"
                                            value={formData?.timings}
                                            onChange={handleChange}
                                        />
                                        {errors.timings && <div className="invalid-feedback">{errors.timings}</div>}
                                    </div>
                                    <p>Please mention job timings correctly otherwise candidates may not join.</p>
                                </div>
                            )}
                        </div>

                        {/* ===== Footer Buttons ===== */}
                        <div className="d-flex justify-content-end my-4 pb-4 me-3">
                            <button className="btn link rounded-pill px-4 me-3">
                                Back
                            </button>
                            <button type="submit" className="btn btn-dark rounded-pill px-4">
                                Next <i className="bi bi-arrow-right ms-2"></i>
                            </button>
                        </div>

                    </div>
                </Form>

            </div>

            {/* ====== Footer ====== */}
            <Footer />

        </>
    );
};

export default JobDetails;
