import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../AuthContext/AuthContext";

interface SignUpResponse {
  token: string;
}

export interface SignUpParams {
  email: string;
  username: string;
  password: string;
  profilePicture?: File;
}

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const { setToken } = useContext(AuthContext);

  const signUp = async ({
    email,
    username,
    password,
    profilePicture,
  }: SignUpParams): Promise<void> => {
    setLoading(true);

    if (!email) {
      toast.error("Please provide a valid email.");
      setLoading(false);
      return;
    }

    if (!username) {
      toast.error("Please provide a username.");
      setLoading(false);
      return;
    }

    if (!profilePicture) {
      toast.error("Please provide a profile picture.");
      setLoading(false);
      return;
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
        setLoading(false);

        return;
      }

      const { token }: SignUpResponse = await response.json();
      setLoading(false);

      setToken(token);
    } catch (err) {
      setLoading(false);
      toast.error("Sign up failed. Please try again.");
    }
  };

  return { signUp, loading };
};

export { useSignUp };
