import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Signup from './Components/signup';
import Signin from './Components/Signin';
import Auction from './Components/auction';
import Dashboard from './Components/Dashboard';
import Landing from './Components/landing';
import './App.css';

function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav className="navbar">
        <ul className="nav-list">
          <li><Link to="/">Signin</Link></li>
          <li><Link to="/signup">Signup</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/auction">Auction</Link></li>
        </ul>
      </nav>

      {/* Content below navbar */}
      <div className="content">
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auction" element={<Auction />} />
        </Routes>
      </div>

      <Landing />

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <h3>Essential Links</h3>
            <ul>
              <li><Link to="#">About Us</Link></li>
              <li><Link to="#">Contact Us</Link></li>
              <li><Link to="#">FAQ</Link></li>
              <li><Link to="#">Terms & Conditions</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>User Account</h3>
            <ul>
              <li><Link to="#">My Bids</Link></li>
              <li><Link to="#">My Listings</Link></li>
              <li><Link to="#">Wishlists</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Additional Features</h3>
            <ul>
              <li><Link to="#">Live Auction</Link></li>
              <li><Link to="#">Recent Winners</Link></li>
              <li><Link to="#">Language Selector</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 AuctionZone | All Rights Reserved</p>
        </div>
      </footer>
    </Router>
  );
}

export default App;
