export default function StreakBadge({ streak }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <span style={{ fontSize: '1.5rem' }}>🔥</span>
      <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{streak}</span>
      <span style={{ color: '#666' }}>day{streak === 1 ? '' : 's'} streak</span>
    </div>
  );
}