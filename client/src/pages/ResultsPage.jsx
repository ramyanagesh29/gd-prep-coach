import { useLocation, useNavigate } from 'react-router-dom';

function scoreColor(score) {
  if (score === null || score === undefined) return 'var(--color-text-faint)';
  if (score >= 70) return 'var(--color-success)';
  if (score >= 40) return 'var(--color-warning)';
  return 'var(--color-danger)';
}

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { attempt, topic } = location.state || {};

  if (!attempt) {
    return (
      <div className="card page-enter" style={{ maxWidth: '500px', margin: '60px auto', textAlign: 'center' }}>
        <p>No results to show.</p>
        <button onClick={() => navigate('/topics')} className="btn btn-primary">Go to Topics</button>
      </div>
    );
  }

  const color = scoreColor(attempt.score);

  return (
    <div className="page-enter" style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div className="card">
        <h2 style={{ textAlign: 'center', marginBottom: '4px' }}>Results</h2>
        <p style={{ textAlign: 'center', marginBottom: '24px' }}>{topic?.title}</p>

        <div style={{ textAlign: 'center', margin: '20px 0 32px' }}>
          <span style={{ fontSize: '3.5rem', fontWeight: 800, color, fontFamily: 'var(--font-heading)' }}>
            {attempt.score ?? '—'}
          </span>
          <span style={{ fontSize: '1.3rem', color: 'var(--color-text-faint)' }}> / 100</span>
        </div>

        {attempt.feedback ? (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '16px',
                marginBottom: '20px',
              }}
            >
              {[
                ['Clarity', attempt.feedback.clarity],
                ['Structure', attempt.feedback.structure],
                ['Relevance', attempt.feedback.relevance],
                ['Assertiveness', attempt.feedback.assertiveness],
              ].map(([label, value]) => (
                <div key={label} style={{ background: 'var(--color-bg)', borderRadius: 'var(--radius-sm)', padding: '14px', border: '1px solid var(--color-border)' }}>
                  <strong style={{ color: 'var(--color-accent-light)', fontSize: '0.85rem' }}>{label}</strong>
                  <p style={{ margin: '6px 0 0', fontSize: '0.9rem' }}>{value}</p>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <strong>Overall Feedback</strong>
              <p style={{ marginTop: '6px' }}>{attempt.feedback.overallFeedback}</p>
            </div>

            <div>
              <strong>Improvement Tips</strong>
              <ul style={{ marginTop: '8px', paddingLeft: '20px', color: 'var(--color-text-muted)' }}>
                {attempt.feedback.improvementTips?.map((tip, i) => (
                  <li key={i} style={{ marginBottom: '6px' }}>{tip}</li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <p style={{ textAlign: 'center', color: 'var(--color-text-faint)' }}>
            Analysis unavailable for this attempt.
          </p>
        )}

        <div style={{ display: 'flex', gap: '12px', marginTop: '28px', justifyContent: 'center' }}>
          <button onClick={() => navigate('/topics')} className="btn btn-primary">Practice Another</button>
          <button onClick={() => navigate('/dashboard')} className="btn btn-secondary">Back to Dashboard</button>
        </div>
      </div>
    </div>
  );
}