import { useRouter } from "next/dist/client/router";
import { FunctionComponent, useContext, useEffect, useState } from "react";
import NavBar from "../components/navbar";
import { GlobalContext } from "../context/GlobalProvider";

const Index: FunctionComponent = () => {
  const context = useContext(GlobalContext);
  const router = useRouter();

  const [reservations, setReservations] = useState<string[]>([]);

  let amount = 100;

  useEffect(() => {
    let temp: string[] = Array(amount).fill("Testing placeholder");
    setReservations(temp);
  }, []);

  useEffect(() => {
    if (context.userState.user === null) {
      router.push("/login");
    }
  }, [context.userState]);

  return (
    <div className="page">
      <NavBar />
      <div className="contentContainer">
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

export default Index;
