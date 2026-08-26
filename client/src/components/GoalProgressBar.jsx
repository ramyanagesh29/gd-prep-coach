export default function GoalProgressBar({ weekProgress, weeklyGoal }) {
  const percent = Math.min(100, Math.round((weekProgress / weeklyGoal) * 100));

  return (
    <div>
      <div style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>
        Weekly Goal: {weekProgress} / {weeklyGoal}
      </div>
      <div style={{ background: '#333', borderRadius: '6px', height: '10px', width: '200px', overflow: 'hidden' }}>
        <div
          style={{
            background: percent >= 100 ? '#0a7' : '#7C6BFF',
            width: `${percent}%`,
            height: '100%',
            transition: 'width 0.3s',
          }}
        />
      </div>
    </div>
  );
}