import axios from "axios";

const instance = axios.create();

instance.defaults.withCredentials = true;
instance.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
instance.defaults.headers.common["Accept"] = "application/json";

export default instance;
