import { serialize } from "cookie";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { checkToken, loginUser } from "../store/authFeature/authFunctions";
import { authSlice } from "../store/authFeature/authSlice";
import { useAppSelector, wrapper } from "../store/store";

const Login: NextPage = () => {
  const dispatch = useDispatch();
  const state = useAppSelector((state) => state);

  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    // if (state.Auth.user !== null) {
    //   router.push("/");
    // }
  }, [state.Auth]);

  const authFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(loginUser({ username, password }));
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
                disabled={state.Auth.pending}
                onChange={(event) => setUsername(event.currentTarget.value)}
                autoComplete="username-"
                className="authInput"
              />
            </div>
            <div className="inputField">
              <p className="inputTitle">Password</p>
              <input
                value={password}
                disabled={state.Auth.pending}
                onChange={(event) => setPassword(event.currentTarget.value)}
                autoComplete="password"
                type="password"
                className="authInput"
              />
            </div>
            <div className="inputField">
              <button
                disabled={state.Auth.pending}
                type="submit"
                className="authLoginBtn"
              >
                Login
              </button>
            </div>
          </div>
          <div className="inputField">
            <p className="userErrorText">
              {state.Auth.userError ? state.Auth.userError : ""}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      const token = req.cookies.token;
      await store.dispatch(checkToken({ token }));

      if (!req.cookies["warning-token"]) {
        await store.dispatch(authSlice.actions.resetUserError());
      }
      const state = store.getState();

      res.setHeader(
        "Set-Cookie",
        serialize("warning-token", "", { path: "/", maxAge: 0 })
      );

      if (state.Auth.user) {
        return {
          redirect: {
            permanent: false,
            destination: "/",
          },
          props: {},
        };
      }

      return {
        props: {},
      };
    }
);

export default Login;
