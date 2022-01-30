import { common } from "./_common.service"
export const tipService = {
  add,
  get,
  delete: _delete,
  update,
  updateVote,
};

function add(data) {
  const url = "tip";
  return common.fetchAPI({ url, method:"POST",data })
}

/**
 * Pass filter conditions token in logged
 * @param {*} data filters
 */
function get(data) {
  const url = "tip/list";
  return common.fetchAPI({ url, method:"POST",data })
}

/**
 * Pass id of tip and token of user want to delete
 * @param {} data
 */
function _delete(id) {
  const url = "tip";
  const parameters = "&idTip=" + id;
  return common.fetchAPI({ url, method:"DELETE", parameters })
}

/**
 * All data requirement from a tip, the id of tip
 * we want to update and the token of user
 * @param {*} data
 */
function update(data) {
  const url = "tip";
  return common.fetchAPI({ url, method:"PUT",data })
}

/**
 * Id of tip and token of user that want to vode
 * @param {*} data
 */
 function updateVote(id, vote) {
  const url = "tip/vote";
  const parameters = "&idTip=" + id + "&vote=" + vote;
  return common.fetchAPI({ url, method:"PUT", parameters })
}
