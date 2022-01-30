import { common } from "./_common.service"

export const userService = {
  addInterest,
  addLocality,
  deleteInterest,
  deleteLocality,
  delete: _delete,
  get,
  getAll,
  login,
  logout,
  register,
  recoverPassword,
  star,
  updateProfileImage,
  updateHome,
  updateLanguages,
  updateUsername,
  updatePassword,
};

function get(id) {
  const url = "user/" + id;
  return common.fetchAPI({ url, method:"GET" })
}

function getAll() {
  const url = "user";
  return common.fetchAPI({ url, method:"GET" })
}

function login(email, password) {
  const url = "user/login";
  return common.fetchAPI({
    url, method:"POST", data:{
      email: email,
      password: password,
    }
  })
}

function logout() {
  const url = "user/logout";
  return common.fetchAPI({ url, method:"POST" })
}

function register(data) {
  const url = "user";
  return common.fetchAPI({ url, method:"POST", data })
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete() {
  const url = "user";
  return common.fetchAPI({ url, method:"DELETE" })
}

function updateProfileImage(data) {
  const url = "user/profileImage";
  return common.fetchAPI({ url, method:"POST", data })
}

function updateHome(home) {
  const url = "user/home";
  return common.fetchAPI({ url, method:"PUT", data:home })
}

function updateLanguages(languages) {
  const url = "user/languages";
  return common.fetchAPI({ url, method:"PUT", data:languages })
}

function addInterest(interest) {
  const url = "user/interest";
  const parameters = "&interest=" + interest
  return common.fetchAPI({ url, method:"PUT", parameters })
}

function deleteInterest(interest) {
  const url = "user/interest";
  const parameters = "&interest=" + interest
  return common.fetchAPI({ url, method:"DELETE", parameters })
}

function addLocality(locality) {
  const url = "user/localityVisited";
  return common.fetchAPI({ url, method:"PUT", data:locality })
}

function deleteLocality(locality) {
  const url = "user/localityVisited";
  const parameters = "&locality=" + locality
  return common.fetchAPI({ url, method:"DELETE", parameters })
}

function updateUsername(username) {
  const url = "user/username";
  const parameters = "&username=" + username
  return common.fetchAPI({ url, method:"PUT", parameters })
}

function updatePassword(data) {
  const url = "user/password";
  return common.fetchAPI({ url, method:"PUT", data })
}

function star(data) {
  const url = "user/star";
  const parameters = "&otherUser=" + data.otherUser + "&valueStar=" + data.valueStar
  return common.fetchAPI({ url, method:"PUT", parameters })
}

function recoverPassword(email) {
  const url = "user/recoverPassword";
  const parameters = "&email=" + email;
  return common.fetchAPI({ url, method:"GET", parameters })
}