import { useState } from "react";
import { toast } from "react-toastify";

interface SignUpResponse {
  message: string;
  username: string;
  email: string;
}

export interface SignUpParams {
  email: string;
  username: string;
  password: string;
  profilePicture?: File;
}

const useSignUp = () => {
  const [loading, setLoading] = useState(false);

  const signUp = async ({
    email,
    username,
    password,
    profilePicture,
  }: SignUpParams): Promise<SignUpResponse | null> => {
    setLoading(true);

    if (!email) {
      toast.error("Please provide a valid email.");
      setLoading(false);
      return null;
    }

    if (!username) {
      toast.error("Please provide a username.");
      setLoading(false);
      return null;
    }

    if (!profilePicture) {
      toast.error("Please provide a profile picture.");
      setLoading(false);
      return null;
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("profilePicture", profilePicture);

    try {
      const response = await fetch("http://localhost:3000/auth/signUp", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        toast.error("Sign up failed");
      }

      const data: SignUpResponse = await response.json();
      setLoading(false);

      return data;
    } catch (err) {
      setLoading(false);
      toast.error("Sign up failed. Please try again.");

      return null;
    }
  };

  return { signUp, loading };
};

export { useSignUp };
