import React from "react";
import { Icons } from "../";
import routes from "../../routes";
import { UtilsUrl, CustomHooks } from "../../utils";

/**
 * Function to customize form based on the type of filters we want
 * @param {*} type
 */
const buildFields = (type) => {
  if (type === routes.travelers.key) {
    return [
      {
        placeholder: "Username",
        name: "username",
      },
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
      },
      {
        placeholder: window.dic("Languages used (Italiano,English,...)"),
        name: "languages",
      },
    ];
  } else if (type === routes.places.key) {
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
      },
      {
        placeholder: window.dic("Name of the place"),
        name: "name",
      },
      {
        placeholder: "Tags (tag1,tag2,...)",
        name: "tags",
      },
      {
        placeholder: window.dic("Languages used (Italiano,English,...)"),
        name: "languages",
      },
      {
        placeholder: window.dic("Search in the description"),
        name: "description",
      },
    ];
  } else {
    return [
      {
        placeholder: "Username",
        name: "username",
      },
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
      },
      {
        placeholder: "Tags (tag1,tag2,...)",
        name: "tags",
      },
      {
        placeholder: window.dic("Languages used (Italiano,English,...)"),
        name: "languages",
      },
      {
        placeholder: window.dic("Search in title or text"),
        name: "text",
      },
    ];
  }
};

function Filters({ history, isOpen = false, close }) {
  const urlPage = history.location.pathname.split("/")[1];

  const currentFilters = UtilsUrl.ReadFiltersInUrl();
  const fields = buildFields(urlPage);
  const [inputs, setInputs] = CustomHooks.useStatusFields(fields, currentFilters);

  const applyFilters = () => {
    UtilsUrl.applyFilters({
      history,
      urlPage,
      inputs
    })
  };

  return (
    <div
      className={`navbar-collapse offcanvas-collapse bg-secondary bg-gradient p-2 ${
        isOpen && "open"
      }`}
    >
      <div className="d-flex w-100 flex-row-reverse d-md-none">
        <button
          type="button"
          className="btn btn-link text-white"
          onClick={close}
        >
          <Icons.ArrowRightCircle />
        </button>
      </div>
      <form className="my-2 my-lg-0">
        {fields.map((item, index) => (
          <input
            key={index}
            className="form-control mb-1"
            type={`${item.type ? item.type : "text"}`}
            placeholder={item.placeholder}
            value={inputs[item.name]}
            name={item.name}
            onChange={setInputs}
          />
        ))}
      </form>
      <button
        className="btn btn-dark btn-sm my-2 w-100"
        type="submit"
        onClick={() => applyFilters()}
      >
        {window.dic("Apply Filters")}
      </button>
    </div>
  );
}

export default Filters;
