import { useState } from 'react';

interface LoginResponse {
  message: string;
  username: string;
}

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string): Promise<LoginResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data: LoginResponse = await response.json();
      setLoading(false);

      return data;
    } catch (err) {
      setLoading(false);
      setError('Login failed. Please try again.');

      return null;
    }
  };

  return { login, loading, error };
};

export { useLogin };