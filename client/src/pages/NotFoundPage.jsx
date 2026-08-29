import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="page-enter" style={{ textAlign: 'center', padding: '80px 24px' }}>
      <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🧭</div>
      <h2>Page not found</h2>
      <p style={{ marginBottom: '20px' }}>The page you're looking for doesn't exist.</p>
      <Link to="/dashboard">
        <button className="btn btn-primary">Back to Dashboard</button>
      </Link>
    </div>
  );
}