import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing

// InstructorRequests component to handle instructor requests
export default function InstructorRequests() {
  // Initialize state for requests, acceptedRequests, and deniedRequests using useState hook
  const [requests, setRequests] = useState([
    { title: 'Request 1', reason: 'Reason 1', date: 'Date 1' },
    { title: 'Request 2', reason: 'Reason 2', date: 'Date 2' },
    { title: 'Request 3', reason: 'Reason 3', date: 'Date 3' },
  ]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [deniedRequests, setDeniedRequests] = useState([]);

  // Function to handle accepting a request
  const handleAccept = (request) => {
    // Add the accepted request to acceptedRequests state and remove it from requests state
    setAcceptedRequests([...acceptedRequests, request]);
    setRequests(requests.filter((r) => r.title!== request.title));
  };

  // Function to handle denying a request
  const handleDeny = (request) => {
    // Add the denied request to deniedRequests state and remove it from requests state
    setDeniedRequests([...deniedRequests, request]);
    setRequests(requests.filter((r) => r.title!== request.title));
  };

  // Return JSX to render the component
  return (
    <div>
      <h2>Instructor Requests</h2>
      <Link to="/request-page">  {/* Use Link for routing to RequestPage */}
        <button>View All Requests (RequestPage)</button>
      </Link>
      {requests.map((request) => (
        <div className="request-card" key={request.title}>
          <h2>{request.title}</h2>
          <p><strong>Reason:</strong> {request.reason}</p>
          <p><strong>Date:</strong> {request.date}</p>
          <button className="accept" onClick={() => handleAccept(request)}>
            Accept
          </button>
          <button className="deny" onClick={() => handleDeny(request)}>
            Deny
          </button>
        </div>
      ))}
    </div>
  );
}