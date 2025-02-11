import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';
import { SignUpParams, useSignUp } from '../hooks/useSignUp';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [showSignUp, toggleSignUp] = useState(false);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const { login, loading: loginLoading, error: loginError } = useLogin();
  const { signUp, loading: signUpLoading, error: signUpError } = useSignUp();

  const handleLogin = async () => {
    await login({ email, password });

  };

  const handleSignUp = async ({ email, username, password }: SignUpParams) => {
    const response = await signUp({ email, username, password });

    // TODO: LOGIN USER AFTER SIGNUP
  }

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="w-full max-w-md p-4 bg-white shadow-md rounded-md mb-20">
        {!showSignUp &&
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            error={loginError}
            handleLogin={handleLogin}
            loading={loginLoading}
            toggleSignUp={toggleSignUp}
          />
        }
        {
          showSignUp &&
          <>
            <SignUpForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              error={signUpError}
              handleSignUp={() => handleSignUp({ email, username, password })}
              toggleSignUp={toggleSignUp}
              loading={signUpLoading}
              username={username}
              setUsername={setUsername}
            />
          </>
        }
      </div>
    </div>
  );
};

export { Login };