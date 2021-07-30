import { User } from "models/user";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "services/firebase";
import userService from "services/userService";

export const useUser = () => {
  const [fbUser, fbLoading, fbError] = useAuthState(auth);
  const [user, setUser] = useState<User>();
  const [initialized, setInitialized] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!fbLoading) {
      if (!initialized && fbUser) {
        userService
          .get(fbUser.uid)
          .then((e) => {
            setUser(e);
            setInitialized(true);
          })
          .catch((e) => {
            auth.signOut().then(() => setInitialized(true));
          })
          .finally(() => {
            setInitialized(true);
          });
      } else {
        setInitialized(true);
      }
    }
  }, [fbUser, fbLoading, fbError, initialized]);

  const login = (name: string, password: string) => {
    setLoading(true);
    return userService
      .login({ name: name, password: password })
      .then((e) => setUser(e))
      .finally(() => setLoading(false));
  };

  const register = (name: string, password: string) => {
    setLoading(true);
    return userService
      .register({ name: name, password: password })
      .then((e) => setUser(e))
      .finally(() => setLoading(false));
  };

  const logout = () => {
    setUser(undefined);
    auth.signOut();
  };

  return { user, initialized, loading, register, login, logout } as const;
};
