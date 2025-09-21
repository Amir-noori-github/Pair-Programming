import JobListing from "../components/JobListing";
import { useEffect, useState } from "react";


const Home = () => {
  const [jobs, setJobs] = useState([]);
  const fetchJobs = async () => {
    const res = await fetch("http://localhost:4000/api/jobs");
    const data = await res.json()
    setJobs(data);
  }

  useEffect(() => {
  fetchJobs();
  }
)
  return (
    <div className="home">
      <div className="job-list">
        {jobs.length === 0 && <p>No jobs found</p>}
        {jobs.length !== 0 &&
          jobs.map((job) => <JobListing key={job.id} {...job} />)}
      </div>
    </div>
  );
};

export default Home;
