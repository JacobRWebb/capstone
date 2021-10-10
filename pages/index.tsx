import { serialize } from "cookie";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import NavBar from "../components/navbar";
import { checkToken } from "../store/authFeature/authFunctions";
import { wrapper } from "../store/store";

const Index: NextPage = () => {
  const [reservations, setReservations] = useState<string[]>([]);

  let amount = 100;

  useEffect(() => {
    let temp: string[] = Array(amount).fill("Testing placeholder");
    setReservations(temp);
  }, []);

  return (
    <div className="page">
      <NavBar />
      <div className="content">
        <div className="container reservationContainer">
          <h1>Reservations</h1>
          {reservations.map((value, index) => {
            return (
              <div key={index} className="reservation">
                <p>{value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      //  TODO verify user token with API and propagate user state with response.
      const token = req.cookies.token;
      await store.dispatch(checkToken({ token }));

      const state = store.getState();

      if (state.Auth.user === null) {
        res.setHeader(
          "Set-Cookie",
          serialize("warning-token", "Placeholder", {
            path: "/",
            maxAge: 1,
          })
        );

        return {
          redirect: {
            permanent: false,
            destination: "/login",
          },
        };
      }

      return {
        props: {},
      };
    }
);

export default Index;
