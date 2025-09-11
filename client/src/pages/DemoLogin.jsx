import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/useAuth.js';

function DemoLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, login } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    const res = login(username, password);
    if (res.ok) {
      navigate('/');
    } else {
      setError(res.error || 'Inloggning misslyckades');
    }
  }

  if (user) {
    return (
      <section style={{ padding: '2rem' }}>
        <h2>Du är inloggad</h2>
        <p>Välkommen tillbaka, {user.name}.</p>
      </section>
    );
  }

  return (
    <section style={{ padding: '2rem' }}>
      <h1>Logga in</h1>
      <p>Använd user / user.</p>
      <form onSubmit={handleSubmit} style={{ maxWidth: 360 }}>
        <div style={{ marginBottom: '0.8rem' }}>
          <label>
            Användarnamn
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              style={{ display: 'block', width: '100%', padding: '0.5rem' }}
            />
          </label>
        </div>
        <div style={{ marginBottom: '0.8rem' }}>
          <label>
            Lösenord
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              style={{ display: 'block', width: '100%', padding: '0.5rem' }}
            />
          </label>
        </div>
        {error && <p style={{ color: 'crimson' }}>{error}</p>}
        <button className="button" type="submit">Logga in</button>
      </form>
    </section>
  );
}

export default DemoLogin;
