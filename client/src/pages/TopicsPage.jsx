import { useState, useEffect } from 'react';
import api from '../api/axios';
import TopicCard from '../components/TopicCard';

const CATEGORIES = ['All', 'Current Affairs', 'Abstract', 'Case Study', 'Social Issues'];

export default function TopicsPage() {
  const [topics, setTopics] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
    alert(`Starting practice for: ${topic.title}\n(Practice page is built on Day 4 of the Blueprint)`);
  }

  return (
    <div>
      <h2>GD Topics</h2>

      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              fontWeight: selectedCategory === cat ? 'bold' : 'normal',
              backgroundColor: selectedCategory === cat ? '#333' : '#eee',
              color: selectedCategory === cat ? '#fff' : '#000',
              padding: '0.4rem 0.8rem',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && <p>Loading topics...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!loading && !error && topics.length === 0 && (
        <p>No topics found in this category.</p>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {topics.map((topic) => (
          <TopicCard key={topic._id} topic={topic} onStart={handleStart} />
        ))}
      </div>
    </div>
  );
}