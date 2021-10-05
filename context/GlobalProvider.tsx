import { createContext, FunctionComponent, useState } from "react";

export enum ERole {
  ADMIN = "Admin",
  USER = "User",
}

export interface IUser {
  username: string;
  password: string;
  role: ERole[];
}

export interface IUserState {
  user: IUser | null;
  userError: string | null;
  token: string | null;
}

export interface IUserFunctions {
  login: ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => void;
  logout: () => void;
}

export interface IGlobalContext {
  userState: IUserState;
  userFunctions: IUserFunctions;
}

export const initialGlobalContext: IGlobalContext = {
  userState: {
    user: null,
    userError: null,
    token: null,
  },
  userFunctions: {
    login: () => {},
    logout: () => {},
  },
};

export const GlobalContext =
  createContext<IGlobalContext>(initialGlobalContext);

const GlobalProvider: FunctionComponent = ({ children }) => {
  const [userState, setUserState] = useState<IUserState>(
    initialGlobalContext.userState
  );

  const fakeUsers: IUser[] = [
    { username: "admin", password: "admin", role: [ERole.USER, ERole.ADMIN] },
    { username: "xodius", password: "xodius", role: [ERole.ADMIN] },
    { username: "user", password: "user", role: [ERole.USER] },
    { username: "user1", password: "user", role: [ERole.USER] },
    { username: "user2", password: "user", role: [ERole.USER] },
  ];

  const login = ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    setUserState({ ...userState, userError: null });
    if (username.length < 3) {
      setUserState({ ...userState, userError: "Username is too short" });
      return;
    } else if (password.length < 3) {
      setUserState({ ...userState, userError: "Password is too short" });
      return;
    }

    // FETCH backend || This is just for frontend development.
    const user = fakeUsers.find(
      (fUser) => fUser.username === username && fUser.password === password
    );

    if (user) {
      setUserState({ ...userState, user });
    } else {
      setUserState({ ...userState, userError: "User not found" });
    }
  };

  const logout = () => {
    setUserState({ ...userState, userError: null, user: null });
  };

  return (
    <GlobalContext.Provider
      value={{ userState, userFunctions: { login, logout } }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
