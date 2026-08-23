import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', gap: '1rem' }}>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/topics">Topics</Link>
      <Link to="/history">History</Link>
    </nav>
  );
}