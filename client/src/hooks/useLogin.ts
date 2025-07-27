import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../AuthContext/AuthContext';

interface LoginResponse {
  token: string;
  user: User;
}

export interface LoginParams {
  email: string;
  password: string;
}

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthState } = useContext(AuthContext);

  const login = async ({
    email,
    password,
  }: LoginParams): Promise<LoginResponse | undefined> => {
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email, // TODO: Accept either email or username
            password,
          }),
        }
      );

      if (!response.ok) {
        const { message } = await response.json();
        toast.error(message);
        setLoading(false);

        return;
      }

      const data: LoginResponse = await response.json();
      setAuthState(data.token, data.user.username, data.user.id);

      setLoading(false);

      return data;
    } catch {
      setLoading(false);
      toast.error('Login failed. Please try again.');
    }
  };

  return { login, loading };
};

export { useLogin };
