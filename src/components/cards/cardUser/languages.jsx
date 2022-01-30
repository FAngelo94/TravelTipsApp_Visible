import React from "react";
import { Icons } from "../../";

function Languages({ dispatchUpdateLanguages, user, editable }) {
  // Functions to update languages
  const [editLanguages, handleEditLanguages] = React.useState(false);
  const [languages, handleLanguages] = React.useState(user.languages);
  const updateLanguages = (e) => {
    e.preventDefault();
    if (
      /^((([A-Za-zÀ-ʯ]{1,32}),)*)+$/.test(languages + ",") ||
      languages === ""
    ) {
      handleEditLanguages(false);
      const languagesArray = languages.split(",");
      dispatchUpdateLanguages(languagesArray.sort());
    }
  };

  return (
    <div>
      {!editLanguages ? (
        <div className="d-flex justify-content-center align-items-center input-group-sm input-group mb-2">
          <Icons.Language d={2.5} />
          <p className="card-text text-center mb-0 ms-2 me-2 ">
            {user.languages ||
              (editable ? window.dic("Insert languages you speak") : "-")}
          </p>
          {editable && (
            <button
              className="btn btn-link p-0 text-dark"
              onClick={() => handleEditLanguages(true)}
            >
              <Icons.Pencil d={1.3} />
            </button>
          )}
        </div>
      ) : (
        <form
          className="d-flex justify-content-center align-items-center mb-2 needs-validation"
          onSubmit={updateLanguages}
        >
          <div className="input-group has-validation">
            <input
              className={`form-control me-2 form-control-sm ${
                /^((([A-Za-zÀ-ʯ]{1,32}),)*)+$/.test(languages + ",") ||
                languages === ""
                  ? "is-valid"
                  : "is-invalid"
              }`}
              type="text"
              value={languages}
              onChange={(e) => handleLanguages(e.target.value)}
              placeholder={window.dic("Example: Italian,English,German,...")}
            />
            <div className="invalid-tooltip">
              {window.dic(
                "Only letters and comma are allowed, max length for language: 32 characters"
              )}
            </div>
          </div>
          <button className="btn btn-primary btn-sm text-dark" type="submit">
            {window.dic("Confirm")}
          </button>
        </form>
      )}
    </div>
  );
}

export default Languages;
