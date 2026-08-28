import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import useSpeechRecognition from '../hooks/useSpeechRecognition';

const CATEGORY_COLORS = {
  'Current Affairs': '#4dabf7',
  'Abstract': '#a99bff',
  'Case Study': '#ffb547',
  'Social Issues': '#2fd480',
};

export default function PracticePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const topic = location.state?.topic;

  const [responseText, setResponseText] = useState('');
  const [inputMethod, setInputMethod] = useState('text');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const { isListening, isSupported, startListening, stopListening } = useSpeechRecognition();

  if (!topic) {
    return (
      <div className="card page-enter" style={{ maxWidth: '500px', margin: '60px auto', textAlign: 'center' }}>
        <p>No topic selected.</p>
        <button onClick={() => navigate('/topics')} className="btn btn-primary">Go to Topics</button>
      </div>
    );
  }

  const badgeColor = CATEGORY_COLORS[topic.category] || 'var(--color-accent)';

  function handleSpeakToggle() {
    if (isListening) {
      stopListening();
    } else {
      setInputMethod('voice');
      startListening((transcript) => {
        setResponseText((prev) => (prev ? prev + ' ' + transcript : transcript));
      });
    }
  }

  async function handleSubmit() {
    if (!responseText.trim()) {
      setError('Please type or speak a response before submitting.');
      return;
    }
    setError('');
    setSubmitting(true);
    try {
      const res = await api.post('/attempts', {
        topicId: topic._id,
        responseText: responseText.trim(),
        inputMethod,
      });
      navigate('/results', { state: { attempt: res.data, topic } });
    } catch (err) {
      setError(err.response?.data?.error || 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="page-enter" style={{ maxWidth: '700px', margin: '0 auto' }}>
      <div className="card">
        <span
          style={{
            display: 'inline-block',
            fontSize: '0.7rem',
            fontWeight: 700,
            color: badgeColor,
            background: `${badgeColor}22`,
            padding: '3px 10px',
            borderRadius: '999px',
            marginBottom: '12px',
          }}
        >
          {topic.category}
        </span>
        <h2 style={{ marginBottom: '8px' }}>{topic.title}</h2>
        <p style={{ marginBottom: '20px' }}>{topic.description}</p>

        <textarea
          value={responseText}
          onChange={(e) => { setInputMethod('text'); setResponseText(e.target.value); }}
          placeholder="Type your response here, or use the Speak button..."
          rows={8}
          style={{ width: '100%', resize: 'vertical' }}
        />

        <div style={{ display: 'flex', gap: '12px', marginTop: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
          {isSupported ? (
            <button
              onClick={handleSpeakToggle}
              className={isListening ? 'btn btn-primary' : 'btn btn-secondary'}
            >
              {isListening ? '⏹ Stop' : '🎤 Speak'}
            </button>
          ) : (
            <span style={{ fontSize: '0.85rem', color: 'var(--color-text-faint)' }}>
              Voice input works best in Chrome. Please type your response instead.
            </span>
          )}

          <button onClick={handleSubmit} disabled={submitting} className="btn btn-primary" style={{ marginLeft: 'auto' }}>
            {submitting ? (
              <>
                <span className="spinner" /> Analyzing...
              </>
            ) : (
              'Submit →'
            )}
          </button>
        </div>

        {isListening && (
          <p style={{ color: 'var(--color-danger)', marginTop: '10px', fontSize: '0.9rem' }}>
            🔴 Listening...
          </p>
        )}
        {error && <p style={{ color: 'var(--color-danger)', marginTop: '10px', fontSize: '0.9rem' }}>{error}</p>}
      </div>
    </div>
  );
}