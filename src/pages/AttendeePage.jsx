import { useState, useEffect } from 'react';
import { fetchAttendees, createAttendee, deleteAttendee } from '../api';
import AttendeeCard from '../components/AttendeeCard';
import Spinner from '../components/LoadingSpinner'; // Import the Spinner component

const AttendeePage = () => {
  const [attendees, setAttendees] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [loading, setLoading] = useState(true);

  // Fetch attendees on initial load
  useEffect(() => {
    const loadAttendees = async () => {
      try {
        const data = await fetchAttendees();
        setAttendees(data);
      } catch (error) {
        console.error('Error loading attendees:', error);
      } finally {
        setLoading(false);
      }
    };
    loadAttendees();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle attendee form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create attendee and update list without reloading
      const newAttendee = await createAttendee(formData);
      setAttendees((prevAttendees) => [...prevAttendees, newAttendee]);  // Append new attendee
      setFormData({ name: '', email: '' });
    } catch (error) {
      console.error('Error creating attendee:', error);
    }
  };

  // Handle attendee deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this attendee?')) {
      try {
        // Delete attendee and update list
        await deleteAttendee(id);
        setAttendees((prevAttendees) => prevAttendees.filter((attendee) => attendee._id !== id)); // Remove deleted attendee
      } catch (error) {
        console.error('Error deleting attendee:', error);
      }
    }
  };

  return (
    <div>
      <h1>Add Attendee</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <button type="submit">Add Attendee</button>
      </form>

      {/* Loading Indicator */}
      {loading ? (
        <div className="loading-spinner">
          <Spinner /> {/* Display the Spinner */}
        </div>
      ) : (
        <div className="show-cards">
          {attendees.map((attendee) => (
            <AttendeeCard
              key={attendee._id}
              attendee={attendee}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AttendeePage;
