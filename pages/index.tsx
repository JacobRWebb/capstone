import { NextPage } from "next";
import { Footer, Navbar } from "../components/layout";
import { ReservationContainer } from "../components/reservations";
import { fetchReservations, reservationSlice, wrapper } from "../store";
import { preFlightUser } from "../util/helpers";

const Index: NextPage = () => {
  return (
    <div className="page">
      <Navbar />
      <div className="content">
        <ReservationContainer />
      </div>
      <Footer />
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const token = req.cookies.token || "";
      const user = await preFlightUser(token, store);

      if (user !== null) {
        await store.dispatch(reservationSlice.actions.toggleAdmin(false));
        await store.dispatch(
          fetchReservations({
            token,
            adminView: store.getState().Reservation.adminToggled,
            filter: store.getState().Reservation.filter,
          })
        );
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
