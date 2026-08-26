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

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!data) return null;

  return (
    <div style={{ maxWidth: '700px' }}>
      <h2>Dashboard</h2>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <StreakBadge streak={data.streak} />

        {editingGoal ? (
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input
              type="number"
              min="1"
              max="14"
              value={goalInput}
              onChange={(e) => setGoalInput(e.target.value)}
              style={{ width: '60px' }}
            />
            <button onClick={handleGoalSave}>Save</button>
            <button onClick={() => setEditingGoal(false)}>Cancel</button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <GoalProgressBar weekProgress={data.weekProgress} weeklyGoal={data.weeklyGoal} />
            <button onClick={() => setEditingGoal(true)} style={{ fontSize: '0.8rem' }}>Edit Goal</button>
          </div>
        )}
      </div>

      {data.behindPace && (
        <div style={{ background: '#3a2a00', color: '#ffcc66', padding: '0.75rem 1rem', borderRadius: '6px', marginBottom: '1rem' }}>
          ⏰ You're behind pace this week — practice today to stay on track!
        </div>
      )}

      <div style={{ marginBottom: '1rem' }}>
        <Link to="/topics">
          <button>Practice a Topic →</button>
        </Link>
      </div>

      <h3>Recent Attempts</h3>
      {data.recentAttempts.length === 0 ? (
        <p style={{ color: '#888' }}>No attempts yet. Start practicing to see your progress here!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {data.recentAttempts.map((a) => (
            <li key={a._id} style={{ padding: '0.5rem 0', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between' }}>
              <span>{a.topicTitle}</span>
              <span>
                <strong>{a.score ?? '—'}</strong> · {new Date(a.createdAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}