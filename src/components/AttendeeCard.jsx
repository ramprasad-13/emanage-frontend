/* eslint-disable react/prop-types */
// src/components/AttendeeCard.jsx

const AttendeeCard = ({ attendee, onDelete }) => {
  return (
    <div className="card">
      <h3>{attendee.name}</h3>
      <p>{attendee.email}</p>
      <button onClick={() => onDelete(attendee._id)}>Delete</button>
    </div>
  );
};

export default AttendeeCard;

