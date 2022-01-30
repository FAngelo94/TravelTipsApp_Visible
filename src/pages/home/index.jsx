import React from "react";
import { Page, Images } from "../../components";

function Home(props) {
  const goToPage = (page) => {
    props.history.push(page);
  };

  return (
    <Page props={props}>
      <div className="container h-100 d-flex flex-column justify-content-around home">
        <div className="row mb-3 mt-3">
          <div
            className="col text-center position-relative"
            onClick={() => goToPage("/cities")}
          >
            <img
              src={Images.cities}
              className="rounded-4 img-fluid mx-auto d-block"
              alt="cities"
            />
            <div className="position-absolute w-100 bottom-0 start-0 h-25 bg-white-ts-50 pt-1">
              {window.dic("Cities")}
            </div>
          </div>
          <div
            className="col text-center position-relative"
            onClick={() => goToPage("/tips")}
          >
            <img
              src={Images.tips}
              className="rounded-4 img-fluid mx-auto d-block"
              alt="tips"
            />
            <div className="position-absolute w-100 bottom-0 start-0 h-25 bg-white-ts-50 pt-1">
            {window.dic("Tips")}
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div
            className="col text-center position-relative"
            onClick={() => goToPage("/itineraries")}
          >
            <img
              src={Images.itineraries}
              className="rounded-4 img-fluid mx-auto d-block"
              alt="itineraries"
            />
            <div className="position-absolute w-100 bottom-0 start-0 h-25 bg-white-ts-50 pt-1">
            {window.dic("Itineraries")}
            </div>
          </div>
          <div
            className="col text-center position-relative"
            onClick={() => goToPage("/experiences")}
          >
            <img
              src={Images.experiences}
              className="rounded-4 img-fluid mx-auto d-block"
              alt="experiences"
            />
            <div className="position-absolute w-100 bottom-0 start-0 h-25 bg-white-ts-50 pt-1">
            {window.dic("Experiences")}
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div
            className="col text-center position-relative"
            onClick={() => goToPage("/travelers")}
          >
            <img
              src={Images.traveler}
              className="rounded-4 img-fluid mx-auto d-block"
              alt="Travelers"
            />
            <div className="position-absolute w-100 bottom-0 start-0 h-25 bg-white-ts-50 pt-1">
            {window.dic("Travelers")}
            </div>
          </div>
          <div className="col text-center position-relative">
            <img
              src={Images.live_activies}
              className="rounded-4 img-fluid mx-auto d-block"
              alt="live activities"
            />
            <div className="position-absolute w-100 bottom-0 start-0 h-25 bg-white-ts-50 pt-1">
            {window.dic("Live Activities")}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
