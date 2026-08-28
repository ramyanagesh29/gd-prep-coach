import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import TopicCard from '../components/TopicCard';

const CATEGORIES = ['All', 'Current Affairs', 'Abstract', 'Case Study', 'Social Issues'];

export default function TopicsPage() {
  const [topics, setTopics] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTopics() {
      setLoading(true);
      setError('');
      try {
        const url = selectedCategory === 'All' ? '/topics' : `/topics?category=${encodeURIComponent(selectedCategory)}`;
        const res = await api.get(url);
        setTopics(res.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to load topics');
      } finally {
        setLoading(false);
      }
    }
    fetchTopics();
  }, [selectedCategory]);

  function handleStart(topic) {
    navigate('/practice', { state: { topic } });
  }

  return (
    <div className="page-enter" style={{ maxWidth: 'var(--max-width)', margin: '0 auto' }}>
      <h2>GD Topics</h2>
      <p style={{ marginBottom: '20px' }}>Pick a topic and start practicing — your AI coach is ready.</p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={selectedCategory === cat ? 'btn btn-primary' : 'btn btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-text-muted)' }}>
          <span className="spinner" /> Loading topics...
        </div>
      )}
      {error && <p style={{ color: 'var(--color-danger)' }}>{error}</p>}

      {!loading && !error && topics.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{ marginBottom: 0 }}>No topics found in this category. Try a different filter.</p>
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '18px' }}>
        {topics.map((topic) => (
          <TopicCard key={topic._id} topic={topic} onStart={handleStart} />
        ))}
      </div>
    </div>
  );
}