import React, { useState } from 'react'

export default function RequestPage() {
  // Initialize state variables
  // requestFilter: string to store the current filter for requests (all, pending, accepted, denied)
  // requests: array of request objects, each containing title, reason, date, and status properties
  // acceptedRequests: array of accepted request objects
  // deniedRequests: array of denied request objects
  const [requestFilter, setRequestFilter] = useState('all');
  const [requests, setRequests] = useState([
    { title: 'Request 1', reason: 'Reason 1', date: 'Date 1', status: 'pending' },
    { title: 'Request 2', reason: 'Reason 2', date: 'Date 2', status: 'pending' },
    { title: 'Request 3', reason: 'Reason 3', date: 'Date 3', status: 'pending' },
  ]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [deniedRequests, setDeniedRequests] = useState([]);

  // Function to update the status of a request and move it to the corresponding array (acceptedRequests or deniedRequests)
  const updateRequestStatus = (request, newStatus) => {
    // Create a new array of requests with the updated status for the given request
    const updatedRequests = requests.map(r => r.title === request.title? {...r, status: newStatus } : r);
    setRequests(updatedRequests);

    // If the new status is 'accepted', add the request to the acceptedRequests array
    if (newStatus === 'accepted') {
      setAcceptedRequests([...acceptedRequests, request])
    }
    // If the new status is 'denied', add the request to the deniedRequests array
    else if (newStatus === 'denied') {
      setDeniedRequests([...deniedRequests, request])
    }
  }

  // Function to handle accepting a request
  const handleAccept = (request) => {
    updateRequestStatus(request, 'accepted');
  }

  // Function to handle denying a request
  const handleDeny = (request) => {
    updateRequestStatus(request, 'denied');
  }

  // Function to get the list of requests based on the current filter
  const getRequestList = () => {
    if (requestFilter === 'all') {
      return requests;
    } else if (requestFilter === 'pending') {
      return requests.filter((request) => request.status === 'pending');
    } else {
      return requestFilter === 'accepted'? acceptedRequests : deniedRequests;
    }
  }

  return (
    <div>
      <h2>All Requests</h2>
      {/* Buttons to filter requests */}
      <button onClick={() => setRequestFilter('all')}>Show All</button>
      <button onClick={() => setRequestFilter('pending')}>Show Pending</button>
      <button onClick={() => setRequestFilter('accepted')}>Show Accepted</button>
      <button onClick={() => setRequestFilter('denied')}>Show Denied</button>

      {/* List of requests */}
      <ul>
        {getRequestList().map((request) => (
          <li key={request.title}>
            <div className="request-card">
              <h2>{request.title}</h2>
              <p><strong>Reason:</strong> {request.reason}</p>
              <p><strong>Date:</strong> {request.date}</p>
              {/* Buttons to accept or deny a request if it's pending */}
              {request.status === 'pending' && (
                <>
                  <button className='accept' onClick={() => handleAccept(request)}>Accept</button>
                  <button className='deny' onClick={() => handleDeny(request)}>Deny</button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Display the number of requests for the current filter */}
      {requestFilter!== 'all' && (
        <>
          <h3>{requestFilter} Requests</h3>
          <ul>
            {getRequestList().map((request) => (
              <li key={request.title}>{request.title}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}