import { useState, useEffect } from 'react';
import { fetchEvents, fetchAttendees, createTask, fetchTasks, updateTask } from '../api'; // Assuming you have a fetchTasks and updateTask API
import Select from 'react-select';  // Import React Select for better UI
import Spinner from '../components/LoadingSpinner'; // Import the Spinner component

const TaskPage = () => {
  const [events, setEvents] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    deadline: '',
    status: 'pending',
    event: '',
    assignedAttendees: [],
  });
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);  // Flag to track if we're editing a task
  const [editingTaskId, setEditingTaskId] = useState(null);  // Store the task ID being edited

  // Fetch events, attendees, and tasks from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsData = await fetchEvents();
        const attendeesData = await fetchAttendees();
        const tasksData = await fetchTasks();  // Fetch tasks from the backend

        setEvents(eventsData);
        setAttendees(attendeesData);
        setTasks(tasksData);  // Store tasks in state
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle attendee selection
  const handleAttendeeChange = (selectedOptions) => {
    const selectedAttendees = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setFormData((prevData) => ({
      ...prevData,
      assignedAttendees: selectedAttendees,
    }));
  };

  // Handle task submission (Create or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        // Update existing task
        const updatedTask = await updateTask(editingTaskId, formData);
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === updatedTask._id ? updatedTask : task
          )
        );
        setIsEditing(false);
        setEditingTaskId(null);
      } else {
        // Create a new task
        const newTask = await createTask(formData);
        setTasks((prevTasks) => [...prevTasks, newTask]);
      }
      // Clear form after submission
      setFormData({
        name: '',
        deadline: '',
        status: 'pending',
        event: '',
        assignedAttendees: [],
      });
    } catch (error) {
      console.error('Error creating or updating task:', error);
    }
  };

  // Map assigned attendees IDs to names for display
  const getAssignedAttendeesNames = (assignedAttendeesIds) => {
    return assignedAttendeesIds
      .map(attendeeId => {
        const attendee = attendees.find(a => a._id === attendeeId);
        return attendee ? attendee.name : 'Unknown';
      })
      .join(', ');
  };

  // Edit task - Pre-fill form with task data
  const handleEdit = (task) => {
    setIsEditing(true);
    setEditingTaskId(task._id);
    setFormData({
      name: task.name,
      deadline: task.deadline.slice(0, 10), // Format deadline to yyyy-MM-dd
      status: task.status,
      event: task.event,
      assignedAttendees: task.assignedAttendees,
    });
  };

  return (
    <div>
      <h1>{isEditing ? 'Edit Task' : 'Create Task'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Task Name"
          required
        />
        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          required
        />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <select name="event" value={formData.event} onChange={handleChange}>
          <option value="">Select Event</option>
          {events.map((event) => (
            <option key={event._id} value={event._id}>{event.name}</option>
          ))}
        </select>

        <Select
          isMulti
          name="assignedAttendees"
          options={attendees.map(attendee => ({
            value: attendee._id,
            label: `${attendee.name} (${attendee.email})`,
          }))}
          onChange={handleAttendeeChange}
          value={formData.assignedAttendees.map(attendeeId => ({
            value: attendeeId,
            label: attendees.find(attendee => attendee._id === attendeeId)?.name,
          }))}
          placeholder="Select Attendees"
          isSearchable
          styles={{
            menu: (provided) => ({
              ...provided,
              maxHeight: '200px', // Limit dropdown height
              overflowY: 'scroll', // Make it scrollable
            }),
          }}
        />

        <button type="submit">{isEditing ? 'Update Task' : 'Create Task'}</button>
      </form>

      {/* Loading Indicator */}
      {loading ? (
        <div className="loading-spinner">
          <Spinner /> {/* Display the Spinner */}
        </div>
      ) : (
        <div className="show-cards">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task._id} className="card">
                <h3>{task.name}</h3>
                <p>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>
                <p>Status: {task.status}</p>
                <p>Assigned Attendees: {getAssignedAttendeesNames(task.assignedAttendees)}</p>
                <button onClick={() => handleEdit(task)}>Edit</button>
              </div>
            ))
          ) : (
            <p>No tasks available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskPage;
