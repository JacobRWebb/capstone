import { FunctionComponent, useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/authFeature/authFunctions";
import { useAppSelector } from "../../store/store";

const LoginForm: FunctionComponent = () => {
  const dispatch = useDispatch();
  const state = useAppSelector((state) => state);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1 className="formTitle">Login Form</h1>
      <div className="inputFields">
        <div className="inputField">
          <label htmlFor="username">Username</label>
          <input
            autoComplete="username"
            disabled={state.Auth.pending}
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="inputField">
          <label htmlFor="password">Password</label>
          <input
            autoComplete="current-password"
            disabled={state.Auth.pending}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="inputField">
          <button
            className="formSubmitBtn"
            disabled={state.Auth.pending}
            type="submit"
          >
            Login
          </button>
        </div>
        {state.Auth.userError && (
          <p className="formErrorText">{state.Auth.userError}</p>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
