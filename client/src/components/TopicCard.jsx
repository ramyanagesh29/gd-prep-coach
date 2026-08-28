import { useState } from 'react';

const CATEGORY_COLORS = {
  'Current Affairs': '#4dabf7',
  'Abstract': '#a99bff',
  'Case Study': '#ffb547',
  'Social Issues': '#2fd480',
};

export default function TopicCard({ topic, onStart }) {
  const [hover, setHover] = useState(false);
  const badgeColor = CATEGORY_COLORS[topic.category] || 'var(--color-accent)';

  return (
    <div
      className="card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: '270px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transform: hover ? 'translateY(-4px)' : 'none',
        boxShadow: hover ? 'var(--shadow-hover)' : 'var(--shadow-card)',
        transition: 'transform 0.18s ease, box-shadow 0.18s ease',
      }}
    >
      <div>
        <span
          style={{
            display: 'inline-block',
            fontSize: '0.7rem',
            fontWeight: 700,
            color: badgeColor,
            background: `${badgeColor}22`,
            padding: '3px 10px',
            borderRadius: '999px',
            marginBottom: '10px',
          }}
        >
          {topic.category}
        </span>
        <h3 style={{ fontSize: '1.05rem', marginBottom: '8px' }}>{topic.title}</h3>
        <p style={{ fontSize: '0.85rem' }}>{topic.description}</p>
      </div>
      <button
        onClick={() => onStart(topic)}
        className="btn btn-primary"
        style={{ marginTop: '14px', width: '100%' }}
      >
        Start Practice →
      </button>
    </div>
  );
}