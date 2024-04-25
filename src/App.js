import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import necessary components
import InstructorRequests from './Components/InstructorRequests'; // Assuming InstructorRequests is a separate component
import RequestPage from './Components/RequestPage'; // Assuming RequestPage is a separate component

function App() {
  return (
    <BrowserRouter>
      <Routes>  {/* Define routes */}
        <Route path="/" element={<InstructorRequests />} />  {/* Route for InstructorRequests */}
        <Route path="/request-page" element={<RequestPage />} />  {/* Route for RequestPage */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;