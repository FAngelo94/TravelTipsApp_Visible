export const common = {
  fetchAPI,
  header: _header
};

//TODO hide this function to external
function _header() {
  return {
    token: localStorage.user ? JSON.parse(localStorage.user).token : "",
    id: localStorage.user ? JSON.parse(localStorage.user).id : -1,
    "Content-Type": "application/json",
  }
}

function fetchAPI({ url, parameters = "", method, data = null, useStringify = true }) {
  console.log("fetch",method, parameters,data,useStringify)
  return fetch(window.api_url + url + "?language=" + window.serverLang + parameters, {
    method: method,
    headers: common.header(),
    body: useStringify && data ? JSON.stringify(data) : data,
  })
    .then((data) => {
      console.log("then",data)
      return data.json();
    })
    .then((data) => {
      console.log("then 2",data)
      return data;
    });
}