import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_BASE = 'https://whole-hermione-lance-ui-0c243c4c.koyeb.app/api';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [apiKey, setApiKey] = useState(localStorage.getItem('apiKey'));

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  const login = async (username, password) => {
    try {
      const response = await axios.post(`${API_BASE}/login`, { username, password });
      const { token: newToken, api_key } = response.data;
      setToken(newToken);
      setApiKey(api_key);
      localStorage.setItem('token', newToken);
      localStorage.setItem('apiKey', api_key);
      // Decode token to get user info, but for simplicity, assume username is in response or set later
      setUser({ username });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Login failed' };
    }
  };

  const signup = async (username, password) => {
    try {
      const response = await axios.post(`${API_BASE}/signup`, { username, password });
      const { token: newToken, api_key } = response.data;
      setToken(newToken);
      setApiKey(api_key);
      localStorage.setItem('token', newToken);
      localStorage.setItem('apiKey', api_key);
      setUser({ username });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.error || 'Signup failed' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setApiKey(null);
    localStorage.removeItem('token');
    localStorage.removeItem('apiKey');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, apiKey, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
