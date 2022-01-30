import { common } from "./_common.service"
export const experienceService = {
  add,
  get,
  getBooked,
  delete: _delete,
  deleteBookDate,
  deleteDate,
  putBookDate,
  putDate,
  update,
  updateVote,
};

/**
 * Add 1 experience
 * @param {*} data basic data for experience creation
 */
function add(data) {
  const url = "experience";
  return common.fetchAPI({ url, method:"POST",data })
}

/**
 * Delete 1 experience
 * @param {} data
 */
function _delete(id) {
  const url = "experience";
  const parameters = "&idExperience=" + id;
  return common.fetchAPI({ url, method:"DELETE", parameters })
}

/**
 * Pass id of experience
 * @param {} data
 */
function deleteBookDate({id, date}) {
  const url = "experience/bookDate";
  const parameters = "&idExperience=" + id + "&date=" + date;
  return common.fetchAPI({ url, method:"DELETE", parameters })
}

/**
 * Pass id of experience
 * @param {} data
 */
function deleteDate({id, date}) {
  const url = "experience/date";
  const parameters = "&idExperience=" + id + "&date=" + date;
  return common.fetchAPI({ url, method:"DELETE", parameters })
}

/**
 * Return list of experience
 * Pass filter conditions and token if logged
 * @param {*} data filters
 */
function get(data) {
  const url = "experience/list";
  return common.fetchAPI({ url, method:"POST",data })
}

/**
 * Return list of booked experience
 * Pass filter conditions and token if logged
 * @param {*} data filters
 */
 function getBooked(data) {
  const url = "experience/listBooked";
  return common.fetchAPI({ url, method:"POST",data })
}

/**
 * Add new book for a date
 * @param {*} data
 */
function putBookDate(data) {
  const url = "experience/bookDate";
  return common.fetchAPI({ url, method:"PUT",data })
}

/**
 * Add new date for 1 experience
 * @param {*} data
 */
function putDate(data) {
  const url = "experience/date";
  return common.fetchAPI({ url, method:"PUT",data })
}

/**
 * All data requirement from a experience, the id of experience
 * we want to update and the token of user
 * @param {*} data
 */
function update(data) {
  const url = "experience";
  return common.fetchAPI({ url, method:"PUT",data })
}

/**
 * Id of experience and token of user that want to vode
 * @param {*} data
 */
function updateVote(id, vote) {
  const url = "experience/vote";
  const parameters = "&idExperience=" + id + "&vote=" + vote;
  return common.fetchAPI({ url, method:"PUT", parameters })
}