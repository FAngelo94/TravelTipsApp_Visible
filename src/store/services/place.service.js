import { common } from "./_common.service"

export const placeService = {
  add,
  addReview,
  delete: _delete,
  deleteReview,
  get,
  getReview,
  update,
  updateReview,
  updateReviewLike,
  updateVote,
};

function add(data) {
  const url = "place";
  return common.fetchAPI({ url, method:"POST", data })
}

function addReview(data) {
  const url = "place/review";
  return common.fetchAPI({ url, method:"POST", data })
}

/**
 * Pass id of place and token of user want to delete
 * @param {} data
 */
function _delete(id) {
  const url = "place";
  const parameters = "&idPlace=" + id;
  return common.fetchAPI({ url, method:"DELETE", parameters })
}

function deleteReview(id) {
  const url = "place/review";
  const parameters = "&idReview=" + id
  return common.fetchAPI({ url, method:"DELETE", parameters })
}

/**
 * Pass filter conditions token in logged
 * @param {*} data filters
 */
function get(data) {
  const url = "place/list";
  const parameters = ""
  return common.fetchAPI({ url, method:"POST", data })
}

function getReview(id) {
  const url = "place/review";
  const parameters = "&idPlace=" + id
  return common.fetchAPI({ url, method:"GET", parameters })
}

/**
 * All data requirement from a place, the id of place
 * we want to update and the token of user
 * @param {*} data
 */
function update(data) {
  const url = "place";
  return common.fetchAPI({ url, method:"PUT", data })
}

function updateReview(data) {
  const url = "place/review";
  return common.fetchAPI({ url, method:"PUT", data })
}

function updateReviewLike(data) {
  const url = "place/review/like";
  const parameters = "&idReview=" + data.idReview + "&like=" + data.like;
  return common.fetchAPI({ url, method:"PUT", parameters })
}

/**
 * Id of place and token of user that want to vode
 * @param {*} data
 */
function updateVote(id, vote) {
  const url = "place/vote";
  const parameters = "&idPlace=" + id + "&vote=" + vote;
  return common.fetchAPI({ url, method:"PUT", parameters })
}
