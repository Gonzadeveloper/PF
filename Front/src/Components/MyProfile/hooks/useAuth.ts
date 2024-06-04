import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearUser } from "../../../Redux/Slices/UserSlice";
import { RootState } from "../../../Redux/index";
import toast from "react-hot-toast";

export const useAuth = () => {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    user,
    getAccessTokenSilently,
  } = useAuth0();
  const dispatch = useDispatch();
  const [userCreated, setUserCreated] = useState(false);
  const userData = useSelector((state: RootState) => state.user.user);

  const checkAndCreateUser = async () => {
    if (!isAuthenticated || userCreated) return;

    try {
      const token = await getAccessTokenSilently();
      console.log("Token obtenido:", token);

      const response = await axios.get(
        `${import.meta.env.VITE_ENDPOINT}/user`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const existingUser = response.data.find(
        (u: any) => u.email === user?.email
      );

      const userData = {
        name: user?.name,
        email: user?.email,
        picture: user?.picture,
        password: "default_password",
        typeuser: "USER",
        address: "default_address",
        country: "default_country",
        city: "default_city",
        state: "default_state",
        postalcode: "00000",
      };

      if (!existingUser) {
        const createUserResponse = await axios.post(
          `${import.meta.env.VITE_ENDPOINT}/user`,
          userData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("Usuario creado:", createUserResponse.data);
        dispatch(setUser(createUserResponse.data));
      } else {
        dispatch(setUser(existingUser));
      }

      setUserCreated(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response?.status === 400 &&
          error.response.data?.error === "Validation error"
        ) {
          const validationError = error.response.data.details.find(
            (detail: any) =>
              detail.path === "email" && detail.type === "unique violation"
          );
          if (validationError) {
            console.error(
              "Cuenta recientemente eliminada. Por favor contacte con soporte."
            );
            toast.error(
              "Cuenta recientemente eliminada. Por favor contacte con soporte.",
              {
                duration: 5000,
                position: "top-right",
              }
            );
            dispatch(clearUser());
            setTimeout(() => {
              logout({ returnTo: window.location.origin } as any);
              console.log("Sesión cerrada");
              localStorage.removeItem("user");
            }, 1000);
          }
        }
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated && !userCreated) {
      console.log(
        "Usuario autenticado y no creado. Llamando a checkAndCreateUser."
      );
      checkAndCreateUser();
    }
  }, [isAuthenticated, userCreated, getAccessTokenSilently, user, dispatch]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      dispatch(setUser(JSON.parse(storedUser)));
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(clearUser());
    logout({ returnTo: window.location.origin } as any);
  };

  return {
    loginWithRedirect,
    logout: handleLogout,
    isAuthenticated,
    user,
    userCreated,
    getAccessTokenSilently,
    userData,
  };
};

export default useAuth;
