import { useRouter } from "next/dist/client/router";
import { FunctionComponent, useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalProvider";

const Logout: FunctionComponent = () => {
  const context = useContext(GlobalContext);
  const router = useRouter();

  useEffect(() => {
    context.userFunctions.logout();
    router.push("/");
  }, [context.userState]);

  return <div></div>;
};
export default Logout;
