import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://burger-7e8a4-default-rtdb.asia-southeast1.firebasedatabase.app/",
});
export default instance;
