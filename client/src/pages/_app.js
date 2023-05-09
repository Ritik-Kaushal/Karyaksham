import store from "@/store/baseStore";
import "@/styles/globals.css";
import "@/styles/navbar.css";
import "@/styles/sidebar.css";
import "@/styles/category.css";
import "@/styles/taskcard.css"
import "react-datetime/css/react-datetime.css";

import { Provider } from "react-redux";


export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
