import { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import './NewsletterSection.css';

export const NewsletterSection = ({ t }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Erro na requisição');
      }

      setStatus('success');
      setEmail('');
    } catch (error) {
      console.error('Erro:', error);
      setStatus('error');
    } finally {
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    }
  };

  return (
    <div className="newsletter-section-container" id="newsletter">
      <div className="newsletter-card">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <img src={`${import.meta.env.BASE_URL}carta_icon_transparent.png`} alt="Ícone E-mail" style={{ width: '220px', height: 'auto', objectFit: 'contain' }} />
        </div>
        
        <h2 className="newsletter-title">{t.nlTitle}</h2>
        <p className="newsletter-subtitle">{t.nlSubtitle}</p>
        
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.nlPlaceholder}
            className="newsletter-input"
            required
            disabled={status === 'loading'}
          />
          <button 
            type="submit" 
            className="newsletter-btn"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                {t.nlButton}
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        {status === 'success' && (
          <div className="newsletter-message success">
            {t.nlSuccess}
          </div>
        )}
        
        {status === 'error' && (
          <div className="newsletter-message error">
            {t.nlError}
          </div>
        )}
      </div>
    </div>
  );
};
