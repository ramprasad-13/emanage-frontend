import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import { useState } from 'react';

import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate(); // Hook for programmatically navigating

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  // Close the menu when a link is clicked
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Handle logout functionality
  const handleLogout = () => {
    // Clear authentication tokens (assuming you're using localStorage for storing JWT tokens)
    localStorage.removeItem('token');  // Remove token from localStorage or adjust as necessary
    // Redirect the user to the login page or home page
    navigate('/login');  // Or navigate to any other page (like '/')
  };

  // Check if the user is logged in based on the presence of the token in localStorage
  const isAuthenticated = localStorage.getItem('token') !== null;

  return (
    <nav>
      <a href="/" className="logo">Event-Manager</a>
      {/* Hamburger icon */}
      <div className="hamburger" onClick={toggleMenu}>
        ☰
      </div>
      {/* Menu links */}
      <ul className={isMenuOpen ? 'active' : ''}>
        <li><Link to="/" onClick={handleLinkClick}>Home</Link></li>
        <li><Link to="/events" onClick={handleLinkClick}>Events</Link></li>
        <li><Link to="/attendees" onClick={handleLinkClick}>Attendees</Link></li>
        <li><Link to="/tasks" onClick={handleLinkClick}>Tasks</Link></li>
        
        {/* Conditional rendering of Login/SignUp or Logout button */}
        <li>
          {!isAuthenticated ? (
            <Link to="/login" className="login-signup-btn">Login / Sign Up</Link>
          ) : (
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
