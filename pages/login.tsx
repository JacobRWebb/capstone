import { useRouter } from "next/dist/client/router";
import {
  FormEvent,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { GlobalContext } from "../context/GlobalProvider";

const Login: FunctionComponent = () => {
  const context = useContext(GlobalContext);
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (context.userState.user) {
      router.push("/");
    }
  }, [context.userState]);

  const authFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    context.userFunctions.login({ username, password });
  };

  return (
    <div className="authPage">
      <div className="exampleContainer">
        <h1 className="headerTitle">Commerce Bank</h1>
        <div className="examples">
          <img
            className="exampleOne"
            src="/ReservationCompilation.svg"
            alt="Reservsation Card"
          />
        </div>
        <div className="exampleContent">
          <h1 className="exampleTitle">Manage Create Explore</h1>
          <p className="exampleDescription">
            We give you the ability to schedule and find local workstations
          </p>
        </div>
      </div>
      <div className="authContainer">
        <span className="alreadyHave">
          <p>Don't Have An Account?</p>
          <a className="clickLink" onClick={() => router.push("/register")}>
            Click Here
          </a>
        </span>
        <form onSubmit={authFormSubmit} className="authForm">
          <h1 className="authTitle">Login to Commerce Bank</h1>
          <div className="inputFields">
            <div className="inputField">
              <p className="inputTitle">User ID</p>
              <input
                value={username}
                onChange={(event) => setUsername(event.currentTarget.value)}
                autoComplete="username-"
                className="authInput"
              />
            </div>
            <div className="inputField">
              <p className="inputTitle">Password</p>
              <input
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
                autoComplete="password"
                type="password"
                className="authInput"
              />
            </div>
            <div className="inputField">
              <button type="submit" className="authLoginBtn">
                Login
              </button>
            </div>
          </div>
          {context.userState.userError ? (
            <div className="inputField">
              <p>{context.userState.userError}</p>
            </div>
          ) : (
            <></>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
