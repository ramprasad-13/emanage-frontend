/* eslint-disable react/prop-types */
// src/components/TaskCard.jsx

const TaskCard = ({ task }) => {
  return (
    <div className="card">
      <h3>{task.name}</h3>
      <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
      <p>Status: {task.status}</p>
      <p>Assigned Attendees: {task.assignedAttendees.join(', ')}</p>
    </div>
  );
};

export default TaskCard;
