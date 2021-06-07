import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import localforage from "localforage";
import { createOffline } from "@redux-offline/redux-offline";
import offlineConfig from "@redux-offline/redux-offline/lib/defaults/index";
import { composeWithDevTools } from "redux-devtools-extension";

import { authReducer } from "./reducers/authReducer";
import { portfolioReducer } from "./reducers/portfolioReducer";
import { leaseReducer } from "./reducers/leaseReducer";
import { propertyReducer } from "./reducers/propertyReducer";
import { contactReducer } from "./reducers/contactReducer";

import axios from "axios";
import Global from "../global";

const env = Global.env;
const version = Global.version;

const effect = (effect, _action) => axios(effect);
const discard = async (error, _action, _retries) => {
  const { request, response } = error;
  if (!request) throw error;
  if (!response) return false;
  return 400 <= response.status && response.status < 500;
};

localforage.config({
  name: "QWILT:" + env,
  version: version,
  storeName: "keyvaluepairs",
  description: "QWILT database",
});

const authPersistConfig = {
  key: "qwilt:auth",
  storage: localforage,
  whitelist: ["auth"],
};

const portfolioPersistConfig = {
  key: "qwilt:portfolio",
  storage: localforage,
};

const leasePersistConfig = {
  key: "qwilt:lease",
  storage: localforage,
};

const propertyPersistConfig = {
  key: "qwilt:property",
  storage: localforage,
};

const contactPersistConfig = {
  key: "qwilt:contact",
  storage: localforage,
};

const {
  middleware: offlineMiddleware,
  enhanceReducer: offlineEnhanceReducer,
  enhanceStore: offlineEnhanceStore,
} = createOffline({
  ...offlineConfig,
  persist: false,
  effect,
  discard,
});

const reducer = combineReducers({
  auth: authReducer,
  portfolio: persistReducer(portfolioPersistConfig, portfolioReducer),
  property: persistReducer(propertyPersistConfig, propertyReducer),
  lease: persistReducer(leasePersistConfig, leaseReducer),
  contact: persistReducer(contactPersistConfig, contactReducer),
});

const persistedReducer = persistReducer(
  authPersistConfig,
  offlineEnhanceReducer(reducer)
);

export default function configureStore() {
  const store = createStore(
    persistedReducer,
    composeWithDevTools(
      offlineEnhanceStore,
      applyMiddleware(thunk, offlineMiddleware)
    )
  );
  const persistor = persistStore(store);

  return { persistor, store };
}
