import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function HistoryPage() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await api.get('/attempts/history');
        setAttempts(res.data);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate('/');
          return;
        }
        setError(err.response?.data?.error || 'Failed to load history');
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  if (loading) return <p>Loading history...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ maxWidth: '700px' }}>
      <h2>Practice History</h2>

      {attempts.length === 0 ? (
        <p style={{ color: '#888' }}>No attempts yet. Go practice a topic to build your history!</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #444', textAlign: 'left' }}>
              <th style={{ padding: '0.5rem' }}>Topic</th>
              <th style={{ padding: '0.5rem' }}>Score</th>
              <th style={{ padding: '0.5rem' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((a) => (
              <tr key={a._id} style={{ borderBottom: '1px solid #333' }}>
                <td style={{ padding: '0.5rem' }}>{a.topicTitle}</td>
                <td style={{ padding: '0.5rem' }}>{a.score ?? '—'}</td>
                <td style={{ padding: '0.5rem' }}>{new Date(a.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}