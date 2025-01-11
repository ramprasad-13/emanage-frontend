import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import EventPage from './pages/EventPage';
import AttendeePage from './pages/AttendeePage';
import TaskPage from './pages/TaskPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component
import './App.css';

const App = () => {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected routes */}
          <Route path="/events" element={<ProtectedRoute element={<EventPage />} />} />
          <Route path="/attendees" element={<ProtectedRoute element={<AttendeePage />} />} />
          <Route path="/tasks" element={<ProtectedRoute element={<TaskPage />} />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
