export default function StreakBadge({ streak }) {
  return (
    <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px' }}>
      <span style={{ fontSize: '2rem' }}>🔥</span>
      <div>
        <div style={{ fontSize: '1.5rem', fontWeight: 800, lineHeight: 1 }}>{streak}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
          day{streak === 1 ? '' : 's'} streak
        </div>
      </div>
    </div>
  );
}