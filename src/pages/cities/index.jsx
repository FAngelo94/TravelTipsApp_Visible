import React from "react";
import { Page, Cards } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { cityActions } from "../../store/actions";
import { UtilsUrl, CustomHooks } from "../../utils";

const buildFields = () => {
  return [
    {
      placeholder: window.dic("Country"),
      name: "country",
    },
    {
      placeholder: window.dic("Province"),
      name: "province",
    },
    {
      placeholder: window.dic("City"),
      name: "city",
    }
  ];
};

function Cities(props) {
  const cities = useSelector((state) => state.city.list);

  const urlPage = props.history.location.pathname.split("/")[1];

  const currentFilters = UtilsUrl.ReadFiltersInUrl();
  const fields = buildFields(urlPage);
  const [inputs, setInputs] = CustomHooks.useStatusFields(fields, currentFilters);

  const filtersPresent = (() => {
    if (currentFilters.country)
      return true;
    if (currentFilters.province)
      return true;
    if (currentFilters.city)
      return true;
    return false;
  })();

  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!cities || cities.length === 0) dispatch(cityActions.get(currentFilters));
  }, [dispatch]);

  const applyFilters = () => {
    UtilsUrl.applyFilters({
      history: props.history,
      urlPage,
      inputs
    })
  }

  return (
    <Page props={props} title="Cities" enableBottom={true}>
      <div className="mb-4 mt-2">
        <div className="d-flex mb-2">
          <input
            className="form-control me-2"
            type="text"
            placeholder={window.dic("Country")}
            value={inputs[fields[0].name]}
            name={fields[0].name}
            onChange={setInputs}
          />
          <input
            className="form-control"
            type="text"
            placeholder={window.dic("Province")}
            value={inputs[fields[1].name]}
            name={fields[1].name}
            onChange={setInputs}
          />
        </div>
        <div className="d-flex">
          <input
            className="form-control me-2"
            type="text"
            placeholder={window.dic("City")}
            value={inputs[fields[2].name]}
            name={fields[2].name}
            onChange={setInputs}
          />
          <button className="btn btn-secondary"
            type="submit"
            onClick={() => applyFilters()}>
            {window.dic("Search")}
          </button>
        </div>
      </div>
      {cities && cities.length > 0 ? (
        cities.map((item, index) => (
          <Cards.CardCity key={index} city={item} history={props.history} />
        ))
      ) : filtersPresent && (
        <h5 className="text-center text-secondary">
          {window.dic("There isn't any content for this place")}
        </h5>
      )}
    </Page>
  );
}

export default Cities;
