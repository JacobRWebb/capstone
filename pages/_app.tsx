import "flatpickr/dist/flatpickr.css";
import "flatpickr/dist/themes/airbnb.css";
import { AppComponent } from "next/dist/shared/lib/router/router";
import Head from "next/head";
import "react-virtualized/styles.css";
import { wrapper } from "../store/store";
import "../styles/index.scss";

const App: AppComponent = ({ Component, ...appProps }) => {
  return (
    <>
      <Head>
        <title>Commerce Bank</title>
      </Head>
      <Component {...appProps} />
    </>
  );
};

export default wrapper.withRedux(App);
