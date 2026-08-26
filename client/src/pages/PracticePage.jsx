import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import useSpeechRecognition from '../hooks/useSpeechRecognition';

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
      <div>
        <p>No topic selected.</p>
        <button onClick={() => navigate('/topics')}>Go to Topics</button>
      </div>
    );
  }

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
    <div style={{ maxWidth: '600px' }}>
      <span style={{ fontSize: '0.8rem', color: '#666' }}>{topic.category}</span>
      <h2>{topic.title}</h2>
      <p style={{ color: '#444' }}>{topic.description}</p>

      <textarea
        value={responseText}
        onChange={(e) => { setInputMethod('text'); setResponseText(e.target.value); }}
        placeholder="Type your response here, or use the Speak button..."
        rows={8}
        style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
      />

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', alignItems: 'center' }}>
        {isSupported ? (
          <button onClick={handleSpeakToggle}>
            {isListening ? '⏹ Stop' : '🎤 Speak'}
          </button>
        ) : (
          <span style={{ fontSize: '0.85rem', color: '#888' }}>
            Voice input works best in Chrome. Please type your response instead.
          </span>
        )}

        <button onClick={handleSubmit} disabled={submitting}>
          {submitting ? 'Analyzing...' : 'Submit →'}
        </button>
      </div>

      {isListening && <p style={{ color: '#0a7' }}>🔴 Listening...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}