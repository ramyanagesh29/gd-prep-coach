export default function GoalProgressBar({ weekProgress, weeklyGoal }) {
  const percent = Math.min(100, Math.round((weekProgress / weeklyGoal) * 100));

  return (
    <div className="card" style={{ padding: '16px 20px', minWidth: '220px' }}>
      <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '8px' }}>
        Weekly Goal: <strong style={{ color: 'var(--color-text)' }}>{weekProgress} / {weeklyGoal}</strong>
      </div>
      <div style={{ background: 'var(--color-bg)', borderRadius: '6px', height: '10px', overflow: 'hidden' }}>
        <div
          style={{
            background: percent >= 100 ? 'var(--color-success)' : 'var(--color-accent)',
            width: `${percent}%`,
            height: '100%',
            transition: 'width 0.4s ease',
          }}
        />
      </div>
    </div>
  );
}