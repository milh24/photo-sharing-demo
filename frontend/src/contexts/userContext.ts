import { User } from "models/user";
import React from "react";

type UserContextType = {
  user?: User;
  loading: boolean;
  register: (name: string, password: string) => Promise<void>;
  login: (name: string, password: string) => Promise<void>;
  logout: () => void;
};

const UserContext = React.createContext<UserContextType>({
  loading: false,
  register: async () => {},
  login: async () => {},
  logout: () => {},
});

export default UserContext;
