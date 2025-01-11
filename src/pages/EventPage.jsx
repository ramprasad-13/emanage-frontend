import { useState, useEffect } from 'react';
import { fetchEvents, createEvent, deleteEvent, updateEvent } from '../api';
import EventCard from '../components/EventCard';
import Spinner from '../components/LoadingSpinner';  // Import the Spinner component

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    date: ''
  });
  const [loading, setLoading] = useState(true);
  const [editingEventId, setEditingEventId] = useState(null);

  // Fetch events on initial load
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (error) {
        console.error('Error loading events:', error);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingEventId) {
      // If we're editing, update the event
      try {
        const updatedEvent = await updateEvent(editingEventId, formData);
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event._id === editingEventId ? { ...event, ...updatedEvent } : event
          )
        );
        setFormData({ name: '', description: '', location: '', date: '' });
        setEditingEventId(null); // Clear the editing state
      } catch (error) {
        console.error('Error updating event:', error);
      }
    } else {
      // Otherwise, create a new event
      try {
        const newEvent = await createEvent(formData);
        setEvents((prevEvents) => [...prevEvents, newEvent]);
        setFormData({ name: '', description: '', location: '', date: '' });
      } catch (error) {
        console.error('Error creating event:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id);
        setEvents((prevEvents) => prevEvents.filter((event) => event._id !== id));
      } catch (error) {
        console.error('Error deleting event:', error);
      }
    }
  };

  const handleEdit = (event) => {
    // Convert date from ISO string to yyyy-MM-dd format
    const formattedDate = event.date ? event.date.split('T')[0] : '';
    setFormData({
      name: event.name || '',
      description: event.description || '',
      location: event.location || '',
      date: formattedDate  // Update date to the correct format
    });
    setEditingEventId(event._id); // Set the event as being edited
  };

  return (
    <div>
      <h1>{editingEventId ? 'Edit Event' : 'Create Event'}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name || ''}
          onChange={handleChange}
          placeholder="Event Name"
          required
        />
        <input
          type="text"
          name="description"
          value={formData.description || ''}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <input
          type="text"
          name="location"
          value={formData.location || ''}
          onChange={handleChange}
          placeholder="Location"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date || ''}  // Ensure default empty string if undefined
          onChange={handleChange}
          required
        />
        <button type="submit">{editingEventId ? 'Update Event' : 'Create Event'}</button>
      </form>

      {loading ? (
        <Spinner />
      ) : (
        <div className='show-cards'>
          {events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onDelete={handleDelete}
              onEdit={() => handleEdit(event)} // Pass event to the handleEdit function
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventPage;
