/* eslint-disable react/prop-types */
// src/components/EventCard.jsx

const EventCard = ({ event, onDelete, onEdit }) => {
  return (
    <div className="card">
      <h3>{event.name}</h3>
      <p>{event.description}</p>
      <p>{event.location}</p>
      <p>{new Date(event.date).toLocaleDateString()}</p>
      <button onClick={() => onEdit(event._id, event)}>Edit</button>
      <button onClick={() => onDelete(event._id)}>Delete</button>
    </div>
  );
};

export default EventCard;
