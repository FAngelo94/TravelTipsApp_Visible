import { useParams } from "react-router-dom";

/**
 * Read if in the url there are any filters and return them in an array
 * @param {*} paramsUrl
 */
export const ReadFiltersInUrl = () => {
  const paramsUrl = useParams().filters;
  if (paramsUrl) {
    const params = paramsUrl.split("&");
    const filters = {};
    params.forEach((p) => {
      const tmp = p.split("=");
      filters[tmp[0]] = tmp[1];
    });
    return filters;
  }
  return {};
};

export const applyFilters = ({ history, urlPage, inputs }) => {
  let filtersString = "";
  for (const [key, value] of Object.entries(inputs)) {
    if (value !== "") filtersString += key + "=" + value + "&";
  }
  filtersString = filtersString.substring(0, filtersString.length - 1);
  history.push("/" + urlPage + "/" + filtersString);
  history.go(0)
};