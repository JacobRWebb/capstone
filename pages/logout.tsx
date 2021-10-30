import { serialize } from "cookie";
import { NextPage } from "next";
import { authSlice } from "../store/authFeature/authSlice";
import { wrapper } from "../store/store";

const Logout: NextPage = () => {
  return <div></div>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ res }) => {
      res.setHeader(
        "Set-Cookie",
        serialize("token", "", {
          path: "/",
          maxAge: 0,
          domain: "xodius.io",
        })
      );

      await store.dispatch(authSlice.actions.logout());

      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
);

export default Logout;
