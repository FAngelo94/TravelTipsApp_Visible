import React from "react";
import { Icons } from "../../";
import { Modals } from "../../";
import { UtilsUser } from "../../../utils";

function Header({
  id,
  text = "",
  idOwner = null,
  history = null,
  initInputs = {},
  updateFunction,
  deleteFunction,
}) {
  const [AddModalOpen, handleAddModalStatus] = React.useState(false);
  const [TrashModalOpen, handleTrashModalStatus] = React.useState(false);
  const goToProfile = () => {
    if (history !== null && idOwner !== null)
      history.push(`/profile/${idOwner}`);
  };

  const _deleteFunction = () => {
    handleTrashModalStatus(false);
    deleteFunction(id);
  };

  const _updateFunction = (data) => {
    data["id"] = id;
    updateFunction(data);
  };

  const editable = idOwner !== null ? UtilsUser.checkIfOwner(idOwner) : false;

  return (
    <div className="d-flex w-100 bg-primary justify-content-between">
      {editable && AddModalOpen && (
        <Modals.AddModal
          history={history}
          close={() => handleAddModalStatus(false)}
          title={"Modify"}
          nameFunction={"Modify"}
          initInputs={initInputs}
          primaryFunction={_updateFunction}
          creation={false}
        />
      )}
      {editable && TrashModalOpen && (
        <Modals.CustomFunctionModal
          close={() => handleTrashModalStatus(false)}
          text={"Confirm the removal?"}
          okFunction={() => _deleteFunction()}
        />
      )}
      <div className="card-header" onClick={goToProfile}>
        {text}
      </div>
      {editable && (
        <div className="d-flex p-2">
          <button
            className="navbar-toggler p-0 border-0 me-3"
            onClick={() => handleAddModalStatus(true)}
          >
            <Icons.Pencil />
          </button>
          <button
            className="navbar-toggler p-0 border-0 me-1"
            onClick={() => handleTrashModalStatus(true)}
          >
            <Icons.Trash />
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
