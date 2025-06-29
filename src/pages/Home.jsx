import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import useFetch from "../useFetch";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [finalJobData, setFinalJobData] = useState([]);

  const apiUrl = "https://bi-mcr-backend.vercel.app/job";
  const { finalData } = useFetch(apiUrl);
  useEffect(() => {
    if (finalData) setFinalJobData(finalData);
  }, [finalData]);

  function searchJobHandler(e) {
    const searchTerm = e.target.value;
    if (!searchTerm) setFinalJobData(finalData);
    else {
      setFinalJobData(
        finalData.filter((eachjob) =>
          eachjob.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }

  function deleteJobHandler(jobId) {
    console.log(jobId);
    const deleteApiUrl = `https://bi-mcr-backend.vercel.app/job/${jobId}`;
    axios
      .delete(deleteApiUrl)
      .then((response) => {
        if (response.status == 200) {
          setFinalJobData(finalData.filter((eachJob) => eachJob._id != jobId));
          return alert("Job Deleted Successfully.");
        } else
          return alert("Some error occurred in deleting. Please try again.");
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      <Navbar />
      <main className="px-5">
        <input
          type="text"
          placeholder="Search by job title..."
          className="form-control my-3"
          onChange={searchJobHandler}
        />
        <h2>All Jobs</h2>
        <section className="row justify-content-start mt-4">
          {finalJobData.length > 0 ? (
            finalJobData.map((eachJob) => (
              <div
                className="col-sm-3 me-3 mb-3 border border-1 rounded p-4"
                style={{ minWidth: "33em" }}
                key={eachJob._id}
              >
                <h3>{eachJob.jobTitle}</h3>
                <p>
                  <strong>Company Name: </strong>
                  {eachJob.company}
                </p>
                <p>
                  <strong>Location: </strong>
                  {eachJob.location}
                </p>
                <p>
                  <strong>Job Type: </strong>
                  {eachJob.jobType}
                </p>
                <div className="d-flex">
                  <NavLink
                    className="btn btn-primary me-3"
                    style={{ width: "40%" }}
                    to={`/job_details/${eachJob._id}`}
                  >
                    See Details
                  </NavLink>
                  <NavLink
                    className="btn btn-danger"
                    style={{ width: "40%" }}
                    onClick={() => deleteJobHandler(eachJob._id)}
                  >
                    Delete
                  </NavLink>
                </div>
              </div>
            ))
          ) : (
            <h2>Loading...</h2>
          )}
        </section>
      </main>
    </>
  );
}
