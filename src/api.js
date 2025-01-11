import axios from 'axios';

// Set up base URL
const API_URL = 'https://emanagebackend.vercel.app/api';

// Helper function to get the JWT token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('token');
};

// Function to set Authorization header for API requests
const setAuthHeader = () => {
  const token = getAuthToken();
  if (token) {
    return {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };
  }
  return {
    headers: {
      'Content-Type': 'application/json'
    }
  };
};

// Event API
export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/events`, setAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const createEvent = async (eventData) => {
  try {
    const response = await axios.post(`${API_URL}/events`, eventData, setAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error);
    throw error;
  }
};

export const updateEvent = async (eventId, eventData) => {
  try {
    const response = await axios.put(`${API_URL}/events/${eventId}`, eventData, setAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

export const deleteEvent = async (eventId) => {
  try {
    const response = await axios.delete(`${API_URL}/events/${eventId}`, setAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

// Attendee API
export const fetchAttendees = async () => {
  try {
    const response = await axios.get(`${API_URL}/attendees`, setAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error fetching attendees:', error);
    throw error;
  }
};

export const createAttendee = async (attendeeData) => {
  try {
    const response = await axios.post(`${API_URL}/attendees`, attendeeData, setAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error creating attendee:', error);
    throw error;
  }
};

export const deleteAttendee = async (attendeeId) => {
  try {
    const response = await axios.delete(`${API_URL}/attendees/${attendeeId}`, setAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error deleting attendee:', error);
    throw error;
  }
};

// Task API
export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks`, setAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${API_URL}/tasks`, taskData, setAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (taskId, taskData) => {
  try {
    const response = await axios.put(`${API_URL}/tasks/${taskId}`, taskData, setAuthHeader());
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

// Authentication API
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);  // No auth required for registration
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData);  // No auth required for login
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};
