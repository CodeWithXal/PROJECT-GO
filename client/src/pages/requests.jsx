import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/dashboardLayout";
import { projectAPI } from "../services/api";
import { Check, X } from "lucide-react";
import "./Requests.css";

const Requests = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const data = await projectAPI.getMyJoinRequests(); 
      setRequests(data);
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    }
  };

  useEffect(() => {
  let interval;

  const loadRequests = async () => {
    try {
      const res = await projectAPI.getMyJoinRequests();
      setRequests(res.requests);
    } catch (error) {
      console.error("Failed to fetch requests", error);
    }
  };

  loadRequests();

  interval = setInterval(loadRequests, 10000);

  return () => clearInterval(interval);
}, []);

  const handleAccept = async (projectId, userId) => {
    try {
      await projectAPI.acceptRequest(projectId, userId);
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (projectId, userId) => {
    try {
      await projectAPI.rejectRequest(projectId, userId);
      fetchRequests();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardLayout activeTab="requests">
      <div className="requests-container">
        {requests.length === 0 && (
          <p>No pending join requests.</p>
        )}

        {requests.map((project) =>
          project.requests.map((reqUser) => (
            <div key={reqUser._id} className="dashboard-card request-card">

              <h3 className="project-title">
                {project.projectName}
              </h3>

              <p><strong>Name:</strong> {reqUser.name}</p>
              <p><strong>Email:</strong> {reqUser.email}</p>
              <p>
                <strong>Skills:</strong>{" "}
                {reqUser.skills?.join(", ")}
              </p>

              <div className="request-actions">
                <Check
                  className="accept-icon"
                  onClick={() =>
                    handleAccept(project.projectId, reqUser._id)
                  }
                />

                <X
                  className="reject-icon"
                  onClick={() =>
                    handleReject(project.projectId, reqUser._id)
                  }
                />
              </div>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
};

export default Requests;