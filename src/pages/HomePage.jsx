import './HomePage.css';  // Assuming you are using an external CSS file for styling.

const HomePage = () => {
  return (
    <>
      <div className="container">
        <header className="header">
          <h1>Event Management Dashboard</h1>
          <p>Manage events, attendees, and tasks in one place</p>
        </header>

        <div className="hero-section">
          <div className="hero-text">
            <h2>Welcome to your Event Management System</h2>
            <p>
              Organize, plan, and track all your events with ease. From guest lists to tasks, everything you need is just a click away.
            </p>
            <button className="cta-btn">Get Started</button>
          </div>
          <div className="hero-image"></div>
        </div>

        <footer className="footer">
          <p>Made with ❤️ by Ramprasad</p>
        </footer>
      </div>
    </>
  );
};

export default HomePage;
