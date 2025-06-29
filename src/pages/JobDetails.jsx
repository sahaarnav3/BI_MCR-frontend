import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import useFetch from "../useFetch";
import { useEffect, useState } from "react";

export default function JobDetails() {
  const [finalJobDetails, setFinalJobDetails] = useState({});

  const apiUrl = `https://bi-mcr-backend.vercel.app/job?jobId=${
    useParams().jobId
  }`;
  const { finalData, loading } = useFetch(apiUrl);
  useEffect(() => {
    if (finalData) setFinalJobDetails(finalData);
  }, [finalData]);

  return (
    <>
      <Navbar />
      {!loading ? (
        <section className="px-5">
          <h2 className="my-4">{finalJobDetails.jobTitle}</h2>
          <div className="border border-2 p-4 rounded">
            <p>
              <strong>Company Name: </strong>
              {finalJobDetails.company}
            </p>
            <p>
              <strong>Location: </strong>
              {finalJobDetails.location}
            </p>
            <p>
              <strong>Salary: </strong>
              {finalJobDetails.salary}
            </p>
            <p>
              <strong>Job Type: </strong>
              {finalJobDetails.jobType}
            </p>
            <p>
              <strong>Description: </strong>
              {finalJobDetails.jobDescription}
            </p>
            <p className="mb-0">
              <strong>Qualifications:</strong>
            </p>
            <ol className="mt-0 pt-0">
              {finalJobDetails?.qualifications?.map((qualification) => (
                <li key={qualification}>{qualification}</li>
              ))}
            </ol>
          </div>
        </section>
      ) : (
        <h2 className="p-5">Loading...</h2>
      )}
    </>
  );
}
