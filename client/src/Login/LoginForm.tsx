import React, { useContext } from 'react';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { AuthContext } from '../AuthContext/AuthContext';
import { toast } from 'react-toastify';

interface LoginFormProps {
  handleLogin: () => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  loading: boolean;
  toggleSignUp: (toggle: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  handleLogin,
  email,
  setEmail,
  password,
  setPassword,
  loading,
  toggleSignUp,
}) => {
  const { setAuthState } = useContext(AuthContext);

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const response = await fetch(import.meta.env.VITE_GOOGLE_AUTH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: credentialResponse.credential,
        }),
      });

      if (!response.ok) {
        toast.error('Login failed');
        return;
      }

      const { token, username, userId } = await response.json();

      setAuthState(token, username, userId);
    } catch {
      toast.error('Login failed');
    }
  };

  const handleError = () => {
    toast.error('Login failed');
  };

  return (
    <>
      <h2 className="text-2xl mb-4 text-gray-800">Login</h2>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex space-x-4 mt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            onClick={() => handleLogin()}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <button
            disabled={loading}
            type="button"
            className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={() => toggleSignUp(true)}
          >
            Sign Up
          </button>
        </div>
        <div className="flex justify-center mt-4">Or sign in with Google</div>
        <div className="flex justify-center mt-4">
          <GoogleLogin
            onSuccess={(credentialResponse) =>
              handleSuccess(credentialResponse)
            }
            onError={handleError}
          />
        </div>
      </form>
    </>
  );
};

export { LoginForm };
