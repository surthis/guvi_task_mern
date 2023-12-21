import React from 'react';
import { Link } from 'react-router-dom';
import '../css/navbar.css';

const Navbar = ({ user, setUser }) => {
  return (
    <nav className="navbar"> {/* Added navbar class */}
      <div className="navbar-list left"> {/* Added navbar-list class */}
        {user ? (
          <>
            <Link to="/" className="navbar-item"> {/* Added navbar-item class */}
              Home
            </Link>
            <Link to="/about" className="navbar-item"> {/* Added navbar-item class */}
              About Us
            </Link>
          </>
        ) : (
          <Link to="/" className="navbar-item"> {/* Added navbar-item class */}
            Home
          </Link>
        )}
      </div>
      <div className="navbar-list right"> {/* Added navbar-list class */}
        {user ? (
          <>
            <Link to="/profile" className="navbar-item"> {/* Added navbar-item class */}
              Profile
            </Link>
            <Link to="/login" onClick={() => setUser(null)} className="navbar-item"> {/* Added navbar-item class */}
              Logout
            </Link>
          </>
        ) : (
          <Link to="/login" className="navbar-item"> {/* Added navbar-item class */}
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
