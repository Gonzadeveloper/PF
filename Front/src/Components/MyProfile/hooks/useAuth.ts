import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../Redux/Slices/UserSlice";
import { RootState } from "../../../Redux/index";

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
    try {
      const token = await getAccessTokenSilently();
      console.log("Token obtenido:", token);

      const response = await axios.get(
        `${import.meta.env.VITE_ENDPOINT}/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const existingUser = response.data.find(
        (u: any) => u.email === user?.email
      );
      if (!existingUser) {
        const createUserResponse = await axios.post(
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
        console.log("Usuario creado:", createUserResponse.data);
        dispatch(
          setUser({
            id: createUserResponse.data.user.id,
            name: createUserResponse.data.user.name,
            email: createUserResponse.data.user.email,
            typeuser: createUserResponse.data.user.typeuser,
            address: createUserResponse.data.user.address,
            country: createUserResponse.data.user.country,
            city: createUserResponse.data.user.city,
            state: createUserResponse.data.user.state,
            postalcode: createUserResponse.data.user.postalcode,
          })
        );
      } else {
        dispatch(
          setUser({
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            typeuser: existingUser.typeuser,
            address: existingUser.address,
            country: existingUser.country,
            city: existingUser.city,
            state: existingUser.state,
            postalcode: existingUser.postalcode,
          })
        );
      }

      setUserCreated(true);
    } catch (error) {
      console.error("Error al verificar o crear el usuario:", error);
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

  return {
    loginWithRedirect,
    logout,
    isAuthenticated,
    user,
    userCreated,
    getAccessTokenSilently,
    userData,
  };
};

export default useAuth;
