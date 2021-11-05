import { serialize } from "cookie";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import { useEffect } from "react";
import LoginForm from "../components/formComponents/LoginForm";
import PreviewContainer from "../components/formComponents/PreviewContainer";
import { authSlice } from "../store/authFeature/authSlice";
import { useAppSelector, wrapper } from "../store/store";
import { preFlightUser } from "../util/helpers";

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
    async ({ req }) => {
      const token = req.cookies.token || "";
      const user = await preFlightUser(token, store);

      if (user !== null) {
        return {
          redirect: {
            permanent: false,
            destination: "/",
          },
        };
      }

      await store.dispatch(authSlice.actions.resetUserError());

      return {
        props: {},
      };
    }
);

export default Login;
