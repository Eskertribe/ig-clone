import { useContext, useState } from "react";
import { AuthContext, User } from "../AuthContext/AuthContext";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const useGetUserProfile = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useContext(AuthContext);
  const [userData, setUserData] = useState<User | undefined>();

  const fetchUserProfileData = async () => {
    if (!token) {
      toast.error("You must be logged in to fetch user profile data.");
      return;
    }

    const { userId } = (await jwtDecode(token)) as { userId: string };

    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/users/profile/${userId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        setLoading(false);
        toast.error("Error fetching user profile");
        return;
      }

      const { user: userData } = await response.json();
      setLoading(false);
      setUserData(userData);

      if (!userData) {
        toast.error("Error fetching user profile");
      }
    } catch (error) {
      toast.error("Error fetching user profile");
      setLoading(false);
    }
  };

  return { fetchUserProfileData, userData, loading };
};

export { useGetUserProfile };
