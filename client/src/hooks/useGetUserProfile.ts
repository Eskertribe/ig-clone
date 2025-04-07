import { useContext, useState } from "react";
import { AuthContext, User } from "../AuthContext/AuthContext";
import { toast } from "react-toastify";

const useGetUserProfile = () => {
  const [loading, setLoading] = useState(false);
  const { token, user } = useContext(AuthContext);
  const [userData, setUserData] = useState<User | undefined>();

  const fetchUserProfileData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:3000/users/profile/${user?.id}`,
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
      }

      const { user: userData } = await response.json();
      setLoading(false);
      setUserData(userData);
    } catch (error) {
      toast.error("Error fetching user profile");
    }
  };

  return { fetchUserProfileData, userData, loading };
};

export { useGetUserProfile };
