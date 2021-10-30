import { serialize } from "cookie";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import LoginForm from "../components/formComponents/LoginForm";
import PreviewContainer from "../components/formComponents/PreviewContainer";
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
    if (state.Auth.user !== null) {
      router.push("/");
    }
  }, [state.Auth]);

  const authFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  return (
    <div className="page">
      <div className="authContainer">
        <PreviewContainer />
        <div className="formContainer">
          <LoginForm />
        </div>
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
