import React, { useState } from "react"
import { SingleFileUploader } from "../AddContent/FileUploader";
import { toast } from "react-toastify";

interface LoginFormProps {
  handleSignUp: () => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  toggleSignUp: (toggle: boolean) => void;
  loading: boolean;
  username: string;
  setUsername: (username: string) => void
  profilePicture?: File
  setProfilePicture: (file: File) => void
}

const SignUpForm: React.FC<LoginFormProps> = ({ handleSignUp, email, setEmail, password, setPassword, toggleSignUp, loading, setUsername, username, profilePicture, setProfilePicture }) => {
  const [passwordCheck, setPasswordCheck] = useState('');

  const handleChange = (file: File) => {
    setProfilePicture(file);
  };

  // Crude validation to ensure passwords match
  // TODO: Use Yup or other validation library
  function validateSingUp(): void {
    if (!email || !username || !password) {
      toast.error('Please fill in all fields')
      return;
    }

    if (password !== passwordCheck) {
      toast.error('Passwords do not match')
      return;
    }

    if (!profilePicture) {
      toast.error('Please upload a profile picture')
      return;
    }

    handleSignUp()
  }

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
        <div className="custom-class-file-upload h-2/5 mb-4 w-full">
          <label className="block text-sm font-medium text-gray-700">Upload a profile picture</label>
          <SingleFileUploader handleChange={handleChange} />
        </div>
        <div className="flex space-x-4 mt-4">
          <button
            type="button"
            disabled={loading}
            className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            onClick={() => validateSingUp()}
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
        </div>
      </form>
    </>
  )
}

export { SignUpForm }