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
  viewingRole: ERole;
  token: string | null;
}

export interface IUserFunctions {
  login: ({
    username,
    password,
    role,
  }: {
    username: string;
    password: string;
    role: ERole;
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
    viewingRole: ERole.USER,
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

  const _loginError = (error: string | null) => {
    setUserState({ ...userState, userError: error });
  };

  const _setUser = (user: IUser | null) => {
    setUserState({ ...userState, user });
  };

  const login = ({
    username,
    password,
    role,
  }: {
    username: string;
    password: string;
    role: ERole;
  }) => {
    _loginError(null);
    if (username.length < 3) {
      _loginError("Username is too short");
      return;
    } else if (password.length < 3) {
      _loginError("Password is too short");
      return;
    }

    // FETCH backend || This is just for frontend development.
    const user = fakeUsers.find(
      (fUser) =>
        fUser.username === username &&
        fUser.password === password &&
        fUser.role.find((fUserRole) => fUserRole === role)
    );

    if (user) {
      setUserState({ ...userState, user, viewingRole: role });
    } else {
      _loginError("User not found");
    }
  };

  const logout = () => {
    _setUser(null);
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
