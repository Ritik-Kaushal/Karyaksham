import store from "@/store/baseStore";
import "@/styles/globals.css";
import "@/styles/navbar.css";
import "@/styles/sidebar.css";
import "@/styles/category.css";
import "@/styles/taskcard.css";
import "@/styles/chart.css";

import { Provider } from "react-redux";
import Auth from "../components/Auth.jsx";

export default function App({ Component, pageProps }) {
  
  return (
    <Provider store={store}>
      <Auth>
        <Component {...pageProps} />
      </Auth>
    </Provider>
  );
}
