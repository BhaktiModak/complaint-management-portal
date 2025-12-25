import React from 'react';

const ComplaintList = () => {
  return (
    <div className="complaint-list">
      <h2>Previous Complaints</h2>
      {/* You can map through fetched complaint data here */}
      <ul>
        <li>Complaint 1</li>
        <li>Complaint 2</li>
      </ul>
    </div>
  );
};

export default ComplaintList;
