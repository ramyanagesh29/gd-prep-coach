import { useLocation, useNavigate } from 'react-router-dom';

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { attempt, topic } = location.state || {};

  if (!attempt) {
    return (
      <div>
        <p>No results to show.</p>
        <button onClick={() => navigate('/topics')}>Go to Topics</button>
      </div>
    );
  }

  const scoreColor = attempt.score >= 70 ? '#0a7' : attempt.score >= 40 ? '#e6a700' : '#d33';

  return (
    <div style={{ maxWidth: '600px' }}>
      <h2>Results</h2>
      <p style={{ color: '#666' }}>{topic?.title}</p>

      <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
        <span style={{ fontSize: '3rem', fontWeight: 'bold', color: scoreColor }}>
          {attempt.score ?? '—'}
        </span>
        <span style={{ fontSize: '1.2rem', color: '#666' }}> / 100</span>
      </div>

      {attempt.feedback && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div><strong>Clarity:</strong> {attempt.feedback.clarity}</div>
            <div><strong>Structure:</strong> {attempt.feedback.structure}</div>
            <div><strong>Relevance:</strong> {attempt.feedback.relevance}</div>
            <div><strong>Assertiveness:</strong> {attempt.feedback.assertiveness}</div>
          </div>

          <p><strong>Overall:</strong> {attempt.feedback.overallFeedback}</p>

          <strong>Improvement Tips:</strong>
          <ul>
            {attempt.feedback.improvementTips?.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </>
      )}

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
        <button onClick={() => navigate('/topics')}>Practice Another</button>
        <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      </div>
    </div>
  );
}