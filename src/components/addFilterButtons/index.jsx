import React from "react";
import { Filters, Modals, Icons } from "../";
import {UtilsUser} from "../../utils"

function AddFilterButtons({
  history,
  disableAdd = false,
  disableFilter = false,
  titleModal = "",
  func = "Add",
  addFunction
}) {
  const [filterOpen, handleFilterStatus] = React.useState(false);
  const [modalOpen, handleModalStatus] = React.useState(false);

  return (
    <div className="d-flex position-fixed bottom-0 start-0 w-100 p-2 z-index-3 bg-white addfiltersbuttons">
      {!disableFilter && (
        <Filters
          history={history}
          isOpen={filterOpen}
          close={() => handleFilterStatus(false)}
        />
      )}
      {!disableAdd && modalOpen && (
        <Modals.AddModal
          history={history}
          close={() => handleModalStatus(false)}
          title={titleModal}
          nameFunction={func}
          primaryFunction={addFunction}
        />
      )}
      {!disableAdd && (
        <button
          type="button"
          className="btn btn-primary flex-grow-1 me-2"
          onClick={() => {UtilsUser.checkIfLogged() ? handleModalStatus(true) : window.showRedirectToLoginModal()}}
        >
          <Icons.PlusCircle />
        </button>
      )}
      {!disableFilter && (
        <button
          type="button"
          className="btn btn-secondary flex-grow-1 d-md-none"
          onClick={() => handleFilterStatus(true)}
        >
          <Icons.FilterCircle />
        </button>
      )}
    </div>
  );
}

export default AddFilterButtons;
