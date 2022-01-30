import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./bootstrap/bootstrap.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";

// imports for languages
import { IntlProvider } from "react-intl";
import { messagesIt } from "./languages/it";
import { messagesEn } from "./languages/en";

import { store } from "./store";

// Set option for intl to support multilanguage
const language = localStorage.getItem("language") || "Italiano";
localStorage.setItem("language", language);
const translations = {
  Italiano: messagesIt,
  English: messagesEn,
};

const abbreviation = () => {
  switch (language) {
    case "Italiano":
      window.serverLang = "it";
      return "it";
    default:
      window.serverLang = "en";
      return "en";
  }
};

// Set API URL based on environment
//TODO Move in env file before production
window.api_url =
  window.location.origin.indexOf("localhost") >= 0
    ? "http://localhost:5000/api/"
    : "https://fangelo94.pythonanywhere.com/api/";

// Set Image URL based on environment
window.images_url =
  window.location.origin.indexOf("localhost") >= 0
    ? "http://localhost:5000/static/images/"
    : "https://fangelo94.pythonanywhere.com/static/images/";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <IntlProvider locale={abbreviation()} messages={translations[language]}>
        <App />
      </IntlProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
