import { useState, useEffect } from 'react';
import api from '../api/axios';

function scoreColor(score) {
  if (score === null || score === undefined) return 'var(--color-text-faint)';
  if (score >= 70) return 'var(--color-success)';
  if (score >= 40) return 'var(--color-warning)';
  return 'var(--color-danger)';
}

export default function HistoryPage() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await api.get('/attempts/history');
        setAttempts(res.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load history');
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-text-muted)' }}>
        <span className="spinner" /> Loading history...
      </div>
    );
  }
  if (error) return <p style={{ color: 'var(--color-danger)' }}>{error}</p>;

  return (
    <div className="page-enter" style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
      <h2>Practice History</h2>

      {attempts.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ margin: 0 }}>No attempts yet. Go practice a topic to build your history!</p>
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px 140px', padding: '14px 20px', borderBottom: '1px solid var(--color-border)', fontSize: '0.85rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
            <span>Topic</span>
            <span>Score</span>
            <span>Date</span>
          </div>
          {attempts.map((a, i) => (
            <div
              key={a._id}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 100px 140px',
                padding: '14px 20px',
                borderBottom: i < attempts.length - 1 ? '1px solid var(--color-border)' : 'none',
                alignItems: 'center',
              }}
            >
              <span>{a.topicTitle}</span>
              <span style={{ fontWeight: 700, color: scoreColor(a.score) }}>{a.score ?? '—'}</span>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                {new Date(a.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}