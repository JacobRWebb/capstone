import { serialize } from "cookie";
import { NextPage } from "next";
import NavBar from "../components/navbar";
import { checkToken } from "../store/authFeature/authFunctions";
import { wrapper } from "../store/store";

const Index: NextPage = () => {
  return (
    <div className="page">
      <NavBar />
      <div className="content">
        <div className="container reservationContainer">
          <h1>Reservations</h1>
          {/* <div key={index} className="reservation">
                <p>{value}</p>
              </div> */}
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

      const state = store.getState();

      if (state.Auth.user === null) {
        if (req.cookies["logged"]) {
          res.setHeader("Set-Cookie", [
            serialize("warning-token", "_", {
              path: "/",
              maxAge: 1,
            }),
            serialize("logged", "_", {
              path: "/",
              maxAge: 0,
            }),
          ]);
        }

        return {
          redirect: {
            permanent: false,
            destination: "/login",
          },
        };
      }

      //  TODO fetch reservations
      return {
        props: {},
      };
    }
);

export default Index;
