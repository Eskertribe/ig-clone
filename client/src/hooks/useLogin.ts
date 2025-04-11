import { useContext, useState } from "react";
import { AuthContext } from "../AuthContext/AuthContext";
import { toast } from "react-toastify";

interface LoginResponse {
  token: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setToken } = useContext(AuthContext);

  const login = async ({
    email,
    password,
  }: LoginParams): Promise<LoginResponse | undefined> => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email, // TODO: Accept either email or username
          password,
        }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        toast.error(message);
        setLoading(false);

        return;
      }

      const data: LoginResponse = await response.json();
      setToken(data.token);

      setLoading(false);

      return data;
    } catch (err) {
      setLoading(false);
      toast.error("Login failed. Please try again.");
    }
  };

  return { login, loading };
};

export { useLogin };
