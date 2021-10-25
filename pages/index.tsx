import { serialize } from "cookie";
import { NextPage } from "next";
import Footer from "../components/Footer";
import NavBar from "../components/navbar";
import ReservationContainer from "../components/reservations/ReservationContainer";
import { checkToken } from "../store/authFeature/authFunctions";
import { fetchReservations } from "../store/reservationFeature/reservationFunctions";
import { wrapper } from "../store/store";

const Index: NextPage = () => {
  return (
    <div className="page">
      <NavBar />
      <div className="content">
        <ReservationContainer />
      </div>
      <Footer />
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

      await store.dispatch(fetchReservations({}));

      return {
        props: {},
      };
    }
);

export default Index;
