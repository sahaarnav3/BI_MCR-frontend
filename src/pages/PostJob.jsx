import { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function PostJob() {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState(0);
  const [jobType, setJobType] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobQualifications, setJobQualifications] = useState("");

  const apiUrl = "https://bi-mcr-backend.vercel.app/job";

  function formSubmitHandler(e) {
    e.preventDefault();
    const requestBody = {
      jobTitle: jobTitle,
      company: companyName,
      location: location,
      salary: salary,
      jobType: jobType,
      jobDescription: jobDescription,
      qualifications: jobQualifications.split(/[.]/),
    };
    axios
      .post(apiUrl, requestBody)
      .then((response) => {
        if (response.status == 200) {
          return alert("Job Detail added successfully.");
        }
      })
      .catch((error) => console.log("Error:", error));
  }
  return (
    <>
      <Navbar />
      <main className="px-5 py-4">
        <h2 className="mb-4">Post a Job</h2>
        <form onSubmit={formSubmitHandler}>
          <label className="form-label">Job Title:</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
          <br />
          <label className="form-label">Company Name:</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
          <br />
          <label className="form-label">Location:</label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <br />
          <label className="form-label">Salary:</label>
          <input
            type="number"
            className="form-control"
            onChange={(e) => setSalary(e.target.value)}
            required
          />
          <br />
          <label className="form-label">Job Type:</label>
          <select
            className="form-select"
            onChange={(e) => setJobType(e.target.value)}
            defaultValue="selected"
            required
          >
            <option value="selected" disabled>
              Select Options
            </option>
            <option value="Full-time (On-site)">Full-time (On-site)</option>
            <option value="Part-time (On-site)">Part-time (On-site)</option>
            <option value="Full-time (Remote)">Full-time (Remote)</option>
            <option value="Part-time (Remote)">Part-time (Remote)</option>
          </select>
          <br />
          <label className="form-label">Job Description:</label>
          <textarea
            className="form-control"
            onChange={(e) => setJobDescription(e.target.value)}
            required
          ></textarea>
          <br />
          <label className="form-label">Job Qualifications:</label>
          <textarea
            className="form-control"
            onChange={(e) => setJobQualifications(e.target.value)}
            required
          ></textarea>
          <br />
          <button type="submit" className="btn btn-primary px-5">
            Post Job
          </button>
        </form>
      </main>
    </>
  );
}
