import { useRouter } from "next/dist/client/router";
import {
  FormEvent,
  FunctionComponent,
  useContext,
  useEffect,
  useState,
} from "react";
import { ERole, GlobalContext } from "../context/GlobalProvider";

const Login: FunctionComponent = () => {
  const context = useContext(GlobalContext);
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loginType, setLoginType] = useState<ERole>(ERole.USER);

  useEffect(() => {
    if (context.userState.user) {
      router.push("/");
    }
  }, [context.userState]);

  const authFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    context.userFunctions.login({ username, password, role: loginType });
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
          <div className="loginTypeGroup">
            <button
              type="button"
              className="loginTypeBtn"
              aria-selected={loginType === ERole.USER}
              onClick={() => {
                setLoginType(ERole.USER);
              }}
            >
              User
            </button>
            <button
              type="button"
              className="loginTypeBtn"
              aria-selected={loginType === ERole.ADMIN}
              onClick={() => {
                setLoginType(ERole.ADMIN);
              }}
            >
              Admin
            </button>
          </div>
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

  // return (
  //   <div className="page">
  //     <div className="centerContainer">
  //       <img src="/ReservationCard.svg" alt="Reservsation Card" height={200} />
  //       <div className="authContainer">
  //         <h1 className="authHeader">Commerce Login</h1>
  //         <div className="authFieldContainer">
  //           <p className="authFieldTitle">Username</p>
  //           <input
  //             className="authInputField"
  //             value={username}
  //             onChange={(event) => setUsername(event.currentTarget.value)}
  //           />
  //         </div>
  //         <div className="authFieldContainer">
  //           <p className="authFieldTitle">Password</p>
  //           <input
  //             className="authInputField"
  //             value={password}
  //             onChange={(event) => setPassword(event.currentTarget.value)}
  //           />
  //         </div>
  //         <div className="authBtnGroup">
  //           <button className="authBtn">Sign in</button>
  //           <button className="authBtn">Admin</button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Login;
