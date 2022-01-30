import { common } from "./_common.service"
export const itineraryService = {
  add,
  get,
  delete: _delete,
  update,
  updateVote,
};

function add(data) {
  const url = "itinerary";
  return common.fetchAPI({ url, method:"POST",data })
}

/**
 * Pass filter conditions token in logged
 * @param {*} data filters
 */
function get(data) {
  const url = "itinerary/list";
  return common.fetchAPI({ url, method:"POST",data })
}

/**
 * Pass id of itinerary and token of user want to delete
 * @param {} data
 */
function _delete(id) {
  const url = "itinerary";
  const parameters = "&idItinerary=" + id;
  return common.fetchAPI({ url, method:"DELETE", parameters })
}

/**
 * All data requirement from a itinerary, the id of itinerary
 * we want to update and the token of user
 * @param {*} data
 */
function update(data) {
  const url = "itinerary";
  return common.fetchAPI({ url, method:"PUT",data })
}

/**
 * Id of itinerary and token of user that want to vode
 * @param {*} data
 */
 function updateVote(id, vote) {
  const url = "itinerary/vote";
  const parameters = "&idItinerary=" + id + "&vote=" + vote;
  return common.fetchAPI({ url, method:"PUT", parameters })
}
