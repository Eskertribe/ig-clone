import { useState } from 'react';

interface SignUpResponse {
  message: string;
  username: string;
  email: string;
}

export interface SignUpParams {
  email: string;
  username: string;
  password: string;
}

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signUp = async ({ email, username, password }: SignUpParams): Promise<SignUpResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/auth/signUp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Sign up failed');
      }

      const data: SignUpResponse = await response.json();
      setLoading(false);

      return data;
    } catch (err) {
      setLoading(false);
      setError('Sign up failed. Please try again.');

      return null;
    }
  };

  return { signUp, loading, error };
};

export { useSignUp };