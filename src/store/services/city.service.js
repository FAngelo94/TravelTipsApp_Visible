import { common } from "./_common.service"

export const cityService = {
  get
};

/**
 * Pass filter conditions token in logged
 * @param {*} data filters
 */
function get(data) {
  const url = "city/list";
  const parameters = ""
  return common.fetchAPI({ url, method:"POST", data })
}