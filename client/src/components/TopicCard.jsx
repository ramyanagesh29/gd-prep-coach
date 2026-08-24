export default function TopicCard({ topic, onStart }) {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '1rem',
        width: '250px',
      }}
    >
      <span style={{ fontSize: '0.75rem', color: '#666' }}>{topic.category}</span>
      <h3 style={{ margin: '0.5rem 0' }}>{topic.title}</h3>
      <p style={{ fontSize: '0.9rem', color: '#444' }}>{topic.description}</p>
      <button onClick={() => onStart(topic)}>Start →</button>
    </div>
  );
}