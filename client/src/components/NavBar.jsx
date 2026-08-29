import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const location = useLocation();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, [location]);

  const linkStyle = ({ isActive }) => ({
    padding: '8px 14px',
    borderRadius: '8px',
    fontWeight: 600,
    fontSize: '0.95rem',
    color: isActive ? 'white' : 'var(--color-text-muted)',
    background: isActive ? 'var(--color-accent)' : 'transparent',
    textDecoration: 'none',
    transition: 'background 0.15s ease, color 0.15s ease',
  });

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  }

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        padding: '14px 24px',
        borderBottom: '1px solid var(--color-border)',
        background: 'rgba(20, 21, 43, 0.9)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '1.3rem' }}>🎙️</span>
          <span style={{ fontWeight: 700, fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>
            GD Prep Coach
          </span>
        </div>

        {isLoggedIn && (
          <>
            <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <NavLink to="/dashboard" style={linkStyle}>Dashboard</NavLink>
              <NavLink to="/topics" style={linkStyle}>Topics</NavLink>
              <NavLink to="/history" style={linkStyle}>History</NavLink>
              <button onClick={handleLogout} className="btn-ghost" style={{ marginLeft: '10px', background: 'none', border: 'none' }}>
                Logout
              </button>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="btn-ghost"
              style={{ display: 'none', background: 'none', border: 'none', fontSize: '1.4rem' }}
              id="mobile-menu-btn"
            >
              ☰
            </button>
          </>
        )}
      </div>

      {isLoggedIn && menuOpen && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '14px' }} id="mobile-menu">
          <NavLink to="/dashboard" style={linkStyle} onClick={() => setMenuOpen(false)}>Dashboard</NavLink>
          <NavLink to="/topics" style={linkStyle} onClick={() => setMenuOpen(false)}>Topics</NavLink>
          <NavLink to="/history" style={linkStyle} onClick={() => setMenuOpen(false)}>History</NavLink>
          <button onClick={handleLogout} className="btn-secondary" style={{ marginTop: '6px' }}>Logout</button>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          #mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}