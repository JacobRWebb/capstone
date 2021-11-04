import { serialize } from "cookie";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import LoginForm from "../components/formComponents/LoginForm";
import PreviewContainer from "../components/formComponents/PreviewContainer";
import { checkToken } from "../store/authFeature/authFunctions";
import { authSlice } from "../store/authFeature/authSlice";
import { useAppSelector, wrapper } from "../store/store";

const Login: NextPage = () => {
  const state = useAppSelector((state) => state);

  const router = useRouter();

  useEffect(() => {
    if (state.Auth.user !== null) {
      router.push("/");
    }
  }, [state.Auth]);

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
      const token = req.cookies.token || null;

      if (token) {
        if (!req.cookies["warning-token"]) {
          await store.dispatch(authSlice.actions.resetUserError());
        }

        res.setHeader(
          "Set-Cookie",
          serialize("warning-token", "", { path: "/", maxAge: 0 })
        );

        await store.dispatch(checkToken({ token }));

        if (store.getState().Auth.user) {
          return {
            redirect: {
              permanent: false,
              destination: "/",
            },
          };
        }
      }

      return {
        props: {},
      };
    }
);

export default Login;
