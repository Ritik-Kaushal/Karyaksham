import store from "@/store/baseStore";
import { VERIFY_TOKEN_URL } from "./constant";
import { login } from "@/store/userStore";
import axios from "axios";

const checkToken = async () => {
    if (localStorage.getItem("token")) {
      const config = {
        headers: {
          token: localStorage.getItem("token"),
        },
      };
      var response = { verified: false };
      await axios
        .get(VERIFY_TOKEN_URL, config)
        .then((res) => {
            console.log(res);
          store.dispatch(login(res.data.username));
          response.verified = true;
        })
        .catch((err) => {
            
        });
      return response;
    } else return { verified: false };
  };
  
  export default checkToken;
  