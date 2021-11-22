import { NextPage } from "next";
import Filter from "../components/Filter";
import Footer from "../components/Footer";
import NavBar from "../components/navbar";
import ReservationContainer from "../components/reservations/ReservationContainer";
import { fetchReservations } from "../store/reservationFeature/reservationFunctions";
import { wrapper } from "../store/store";
import { preFlightUser } from "../util/helpers";

const Index: NextPage = () => {
  return (
    <div className="page">
      <NavBar />
      <div className="content">
        <ReservationContainer />
      </div>
      <Footer />
      <Filter />
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const token = req.cookies.token || "";
      const user = await preFlightUser(token, store);

      if (user !== null) {
        await store.dispatch(fetchReservations({ token }));
        return {
          props: {},
        };
      }

      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }
);

export default Index;
