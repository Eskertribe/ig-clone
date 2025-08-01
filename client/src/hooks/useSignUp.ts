import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { AuthContext } from '../AuthContext/AuthContext';

interface SignUpResponse {
  token: string;
  user: User;
}

export interface SignUpParams {
  email: string;
  username: string;
  name: string;
  password: string;
  profilePicture?: File;
}

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthState } = useContext(AuthContext);

  const signUp = async ({
    email,
    username,
    password,
    name,
    profilePicture,
  }: SignUpParams): Promise<void> => {
    setLoading(true);

    if (!email) {
      toast.error('Please provide a valid email.');
      setLoading(false);
      return;
    }

    if (!username) {
      toast.error('Please provide a username.');
      setLoading(false);
      return;
    }

    if (!profilePicture) {
      toast.error('Please provide a profile picture.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('name', name);
    formData.append('profilePicture', profilePicture);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/signUp`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        const { message } = await response.json();
        toast.error(`Sign up failed. ${message}`);
        setLoading(false);

        return;
      }

      const { token, user }: SignUpResponse = await response.json();
      setLoading(false);

      setAuthState(token, user.username, user.id);
    } catch {
      setLoading(false);
      toast.error('Sign up failed. Please try again.');
    }
  };

  return { signUp, loading };
};

export { useSignUp };
