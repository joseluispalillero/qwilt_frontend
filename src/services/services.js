import axios from "axios";
import Global from "../global";
import AxiosOffline from "axios-offline";
import LocalForage from "localforage";

const baseURL = Global.url;

class Services {
  constructor() {
    let AxiosOfflineAdapter = AxiosOffline({
      defaultAdapter: axios.defaults.adapter, //require, basic adapter
      storageName: "axiosQwilt", //optional, default: "axios-stack"
      storageDriver: LocalForage.WEBSQL, //optional, default: LocalForage.LOCALSTORAGE
    });

    this.service = axios.create({
      timeout: 30000,
      adapter: AxiosOfflineAdapter,
      baseURL,
      withCredentials: true,
    });

    this.service.interceptors.response.use(
        async (response) => {
          if (response.headers.version !== Global.version) {
            await LocalForage.clear();
            return null;
          } else {
            return response;
          }
        },
        (error) => {
          return Promise.reject(error.message);
        }
    );
  }

  signup(data) {
    return this.service.post("/auth/signup", data);
  }

  login(data) {
    return this.service.post("/auth/login", data);
  }

  logout() {
    return this.service.get("/auth/logout");
  }

  //Portfolios
  getPortfolios() {
    return this.service.get("/portfolios/all");
  }

  addPortfolio(data) {
    return this.service.post("/portfolios/create", data);
  }

  //Property
  getProperties() {
    return this.service.get("/properties/all");
  }

  addProperty(data) {
    return this.service.post("/properties/create", data);
  }

  //Leases
  getLeases() {
    return this.service.get("/leases/all")
  }

  //contacts
  getContacts() {
    return this.service.get("/contacts/all")
  }
  addContact(data) {
    return this.service.post("/contacts/create", data);
  }

  //files
  upload(file, onUploadProgress) {
    let formData = new FormData();
    formData.append("photo", file);
    return this.service.post("/v2/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }

  getFiles() {
    return this.service.get("/files");
  }
}

export default Services;