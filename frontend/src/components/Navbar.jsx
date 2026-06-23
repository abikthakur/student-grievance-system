import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to={user ? '/' : '/login'} className="navbar-brand">
          Grievance System
        </Link>
        
        <div className="navbar-nav">
          {!user && (
            <>
              {location.pathname === '/login' && (
                <>
                  <a href="#features" className="nav-link" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>Features</a>
                  <a href="#how-it-works" className="nav-link" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>How It Works</a>
                  <a href="#faq" className="nav-link" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>FAQ</a>
                  <Link to="/register" className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>Register</Link>
                </>
              )}
              {location.pathname === '/register' && (
                <Link to="/login" className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>Login</Link>
              )}
            </>
          )}
          {user && (
            <>
              <span className="user-greeting">Hi, {user.name}</span>
              <button className="btn btn-outline" onClick={handleLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

