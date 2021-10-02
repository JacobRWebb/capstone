import { AppComponent } from "next/dist/shared/lib/router/router";
import Head from "next/head";
import "react-virtualized/styles.css";
import GlobalProvider from "../context/GlobalProvider";
import "../styles/index.scss";

const App: AppComponent = ({ Component, ...appProps }) => {
  return (
    <GlobalProvider>
      <Head>
        <title>Commerce Bank</title>
      </Head>
      <Component {...appProps} />
    </GlobalProvider>
  );
};

export default App;
