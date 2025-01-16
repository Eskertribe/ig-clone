import React, { useState } from "react"

interface LoginFormProps {
  error: string | null;
  handleSignUp: () => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  toggleSignUp: (toggle: boolean) => void;
  loading: boolean;
  username: string;
  setUsername: (username: string) => void
}

const SignUpForm: React.FC<LoginFormProps> = ({ error, handleSignUp, email, setEmail, password, setPassword, toggleSignUp, loading, setUsername, username }) => {
  const [passwordCheck, setPasswordCheck] = useState('');

  return (
    <>
      <h2 className="text-2xl mb-4 text-gray-800">Sign up</h2>
      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="passwordAgain" className="block text-sm font-medium text-gray-700">Password again:</label>
          <input
            type="password"
            id="passwordAgain"
            value={passwordCheck}
            onChange={(e) => setPasswordCheck(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        <div className="flex space-x-4 mt-4">
          <button
            type="button"
            disabled={loading}
            className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={() => handleSignUp()}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
          <button
            disabled={loading}
            type="button"
            className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            onClick={() => toggleSignUp(false)}
          >
            Cancel
          </button>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
      </form>
    </>
  )
}

export { SignUpForm }