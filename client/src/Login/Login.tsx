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
  const [file, setFile] = useState<File | undefined>();

  const { login, loading: loginLoading, error: loginError } = useLogin();
  const { signUp, loading: signUpLoading } = useSignUp();

  const handleLogin = async () => {
    await login({ email, password });

  };

  const handleSignUp = async ({ email, username, password, profilePicture }: SignUpParams) => {
    const response = await signUp({ email, username, password, profilePicture });

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
              handleSignUp={() => handleSignUp({ email, username, password, profilePicture: file })}
              toggleSignUp={toggleSignUp}
              loading={signUpLoading}
              username={username}
              setUsername={setUsername}
              setProfilePicture={setFile}
              profilePicture={file}
            />
          </>
        }
      </div>
    </div>
  );
};

export { Login };