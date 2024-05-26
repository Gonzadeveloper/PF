import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios from "axios";

const useAuth = () => {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    user,
    getAccessTokenSilently,
  } = useAuth0();

  const [userCreated, setUserCreated] = useState(false);

  useEffect(() => {
    const checkUserExists = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.get(
          `${import.meta.env.VITE_ENDPOINT}/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.data) {
          await createUser();
        } else {
          setUserCreated(true);
        }
      } catch (error) {
        console.error("Error al verificar si el usuario existe:", error);
      }
    };

    const createUser = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await axios.post(
          `${import.meta.env.VITE_ENDPOINT}/user`,
          {
            name: user?.name,
            email: user?.email,
            password: "default_password",
            typeuser: "USER",
            address: "default_address",
            country: "default_country",
            city: "default_city",
            state: "default_state",
            postalcode: "00000",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Usuario creado:", response.data);
        setUserCreated(true);
      } catch (error) {
        console.error("Error al crear el usuario:", error);
      }
    };

    if (isAuthenticated) {
      checkUserExists();
    }
  }, [isAuthenticated, getAccessTokenSilently]);

  return {
    loginWithRedirect,
    logout,
    isAuthenticated,
    user,
    userCreated,
    getAccessTokenSilently,
  };
};

export default useAuth;
