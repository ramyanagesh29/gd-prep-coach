import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import StreakBadge from '../components/StreakBadge';
import GoalProgressBar from '../components/GoalProgressBar';

export default function DashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingGoal, setEditingGoal] = useState(false);
  const [goalInput, setGoalInput] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/users/dashboard');
      setData(res.data);
      setGoalInput(res.data.weeklyGoal);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/');
        return;
      }
      setError(err.response?.data?.error || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  }

  async function handleGoalSave() {
    try {
      await api.put('/users/goal', { weeklyGoal: Number(goalInput) });
      setEditingGoal(false);
      fetchDashboard();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to update goal');
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-text-muted)' }}>
        <span className="spinner" /> Loading dashboard...
      </div>
    );
  }
  if (error) return <p style={{ color: 'var(--color-danger)' }}>{error}</p>;
  if (!data) return null;

  return (
    <div className="page-enter" style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
      <h2>Dashboard</h2>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'stretch', marginBottom: '20px', flexWrap: 'wrap' }}>
        <StreakBadge streak={data.streak} />

        {editingGoal ? (
          <div className="card" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="number"
              min="1"
              max="14"
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              style={{ width: '70px' }}
            />
            <button onClick={handleGoalSave} className="btn btn-primary">Save</button>
            <button onClick={() => setEditingGoal(false)} className="btn btn-secondary">Cancel</button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <GoalProgressBar weekProgress={data.weekProgress} weeklyGoal={data.weeklyGoal} />
            <button onClick={() => setEditingGoal(true)} className="btn-ghost" style={{ background: 'none', border: 'none' }}>
              Edit Goal
            </button>
          </div>
        )}
      </div>

      {data.behindPace && (
        <div
          style={{
            background: 'rgba(255, 181, 71, 0.12)',
            border: '1px solid var(--color-warning)',
            color: 'var(--color-warning)',
            padding: '12px 18px',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '20px',
          }}
        >
          ⏰ You're behind pace this week — practice today to stay on track!
        </div>
      )}

      <Link to="/topics">
        <button className="btn btn-primary" style={{ marginBottom: '28px' }}>Practice a Topic →</button>
      </Link>

      <h3>Recent Attempts</h3>
      {data.recentAttempts.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '32px' }}>
          <p style={{ margin: 0 }}>No attempts yet. Start practicing to see your progress here!</p>
        </div>
      ) : (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          {data.recentAttempts.map((a, i) => (
            <div
              key={a._id}
              style={{
                padding: '14px 20px',
                borderBottom: i < data.recentAttempts.length - 1 ? '1px solid var(--color-border)' : 'none',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>{a.topicTitle}</span>
              <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                <strong style={{ color: 'var(--color-text)' }}>{a.score ?? '—'}</strong> · {new Date(a.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}