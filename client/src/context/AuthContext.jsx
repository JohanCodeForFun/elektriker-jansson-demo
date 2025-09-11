import { useMemo, useState } from 'react';
import { AuthContext } from './auth-context.js';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    if (username === 'user' && password === 'user') {
      setUser({ name: 'user' });
      return { ok: true };
    }
    return { ok: false, error: 'Fel användarnamn eller lösenord' };
  };

  const logout = () => setUser(null);

  const value = useMemo(() => ({ user, login, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

