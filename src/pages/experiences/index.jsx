import React from "react";
import { Page, AddFilterButtons, Cards, Icons, Modals } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { experienceActions } from "../../store/actions";
import { UtilsUrl, CustomHooks } from "../../utils";

function Experiences(props) {

  const experiences = useSelector((state) => state.experience.list);
  const bookedExperiences = useSelector((state) => state.experience.listBooked);

  const filters = UtilsUrl.ReadFiltersInUrl();
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (!experiences || experiences.length === 0) dispatch(experienceActions.get(filters));
    if (!bookedExperiences || bookedExperiences.length === 0) dispatch(experienceActions.getBooked(filters));
  }, [dispatch]);

  const addFunction = (data) => {
    dispatch(experienceActions.add(data));
  }

  const updateFunction = (data) => {
    dispatch(experienceActions.update(data));
  }

  const deleteFunction = (data) => {
    dispatch(experienceActions.delete(data));
  }

  const voteFunction = (data) => {
    dispatch(experienceActions.updateVote(data));
  }

  const bookFunction = (data) => {
    dispatch(experienceActions.putBookDate(data));
  }

  const deleteBookedFunction = (data) => {
    dispatch(experienceActions.deleteBookDate(data));
  }

  const addDateFunction = (data) => {
    dispatch(experienceActions.putDate(data));
  }

  const removeDateFunction = (data) => {
    dispatch(experienceActions.deleteDate(data));
  }


  // Custom hoooks to manage the delete of data
  const [deleteModalOpen, openModal, closeModal, deleteDate] = CustomHooks.useDeleteDateWithModal(deleteBookedFunction);

  const buildBookedList = () => {
    return <div className="accordion" id={"accordion"}>
      <div className="accordion-item border">
        <h2
          className="accordion-header"
          id={"headingExperience"}
        >
          <button
            className="accordion-button rounded-0 collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={"#collapseBookedExperience"}
            aria-expanded="false"
            aria-controls={"collapseBookedExperience"}
          >
            {window.dic("Booked experience")}
          </button>
        </h2>
        <div
          id={"collapseBookedExperience"}
          className="accordion-collapse collapse"
          aria-labelledby={"headingExperience"}
          data-bs-parent={"#accordion"}
        >
          <div className="accordion-body">
            <ul className="list-group has-validation">
              {bookedExperiences.map((item, index) => (
                <li
                  key={index}
                  className={`list-group-item`}
                >
                  <div className="d-flex justify-content-between">
                    <span className="fw-bold" >{item.title}</span>
                    <span onClick={() => openModal(item.date, item.id)}>
                      <Icons.X />
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>{item.date.replace("T", " ")}</span>
                    <span className="me-2">{`${item.places}`}</span>

                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>

  }

  return (
    <Page props={props} title="Experiences" enableBottom={true}>
      {deleteModalOpen && (
        <Modals.CustomFunctionModal
          close={() => closeModal()}
          text={"Confirm the removal?"}
          okFunction={() => deleteDate()}
        />
      )}
      {buildBookedList()}
      <AddFilterButtons history={props.history} props={props} titleModal="Add new experience" addFunction={addFunction} />
      {experiences.map((item, index) => (
        <Cards.CardExperience key={index} experience={item} history={props.history} updateFunction={updateFunction} deleteFunction={deleteFunction} voteFunction={voteFunction}
          bookFunction={bookFunction} addDateFunction={addDateFunction} removeDateFunction={removeDateFunction} />
      ))}
    </Page>
  );
}

export default Experiences;
