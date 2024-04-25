import React, { createContext, useState, useContext } from 'react';

const RequestContext = createContext({
  requests: [],
  acceptedRequests: [],
  deniedRequests: [],
  updateRequestStatus: () => {},
});

export const RequestProvider = ({ children }) => {
  const [requests, setRequests] = useState([
    { id: 'uuid1', title: 'Request 1', reason: 'Reason 1', date: 'Date 1', status: 'pending' },
    { id: 'uuid2', title: 'Request 2', reason: 'Reason 2', date: 'Date 2', status: 'pending' },
    { id: 'uuid3', title: 'Request 3', reason: 'Reason 3', date: 'Date 3', status: 'pending' },
  ]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const [deniedRequests, setDeniedRequests] = useState([]);

  const updateRequestStatus = (requestId, newStatus) => {
    const updatedRequests = requests.map((request) =>
      request.id === requestId ? { ...request, status: newStatus } : request
    );
    setRequests(updatedRequests);

    const request = requests.find((r) => r.id === requestId);
    if (!request) {
      console.error('Request not found:', requestId);
      return; // Handle potential missing request gracefully
    }

    if (newStatus === 'accepted') {
      setAcceptedRequests([...acceptedRequests, request]);
    } else if (newStatus === 'denied') {
      setDeniedRequests([...deniedRequests, request]);
    }
  };

  return (
    <RequestContext.Provider
      value={{ requests, acceptedRequests, deniedRequests, updateRequestStatus }}
    >
      {children}
    </RequestContext.Provider>
  );
};

export const useRequestState = () => useContext(RequestContext);
