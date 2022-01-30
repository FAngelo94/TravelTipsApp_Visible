import React from "react";
import { Page, Icons } from "../../components";

function About(props) {
  return (
    <Page props={props} title="About" enableBottom={true}>
      <p className="h2 text-center">{"Application Work in Progress"}</p>
      <p className="text-center">
        {
          "This application is work in progress and a most of the functionalities aren't available"
        }
      </p>
      <p className="h2 text-center">{"Our missions"}</p>
      <p className="text-center">
        {
          "Create a place where travel lovers can get fastly different type information about cities and place"
        }
      </p>
      <p className="text-center">
        {
          "Create a place where you can create an experience for other traveler in your city for fun and meet new friends or to earn some money or for both, why no?"
        }
      </p>
      <p className="text-center">
        {
          "Create a place where you can find experiences to live a place like local people"
        }
      </p>
      <p className="h2 text-center">{"Follow us"}</p>
      <p className="text-center">{"For the next updates follow our channels"}</p>
      <div className="d-flex justify-content-evenly mb-3">
      <a href="https://www.facebook.com/Traveltips-109537224061891/" title="Placeholder link title" className="text-decoration-none">
        <Icons.Facebook />
      </a>
      <a href="https://www.instagram.com/traveltips_app/" title="Placeholder link title" className="text-decoration-none">
        <Icons.Instagram />
      </a>
      <a href="https://twitter.com/Travelt95176429" title="Placeholder link title" className="text-decoration-none">
        <Icons.Twitter />
      </a>
      </div>
      

      <p className="h2 text-center">{"Who are we?"}</p>

      <div className="card mb-2 mt-2 mx-auto">
        <div className="card-body bg-light p-2">
          <img
            src={"https://traveltips-a9abd.web.app/images/matchings/angelo.jpg"}
            className="card-img-top"
            alt=""
          />
          <h5 className="card-title text-center">Angelo Falci</h5>
          <ul>
            <li>
              {"Educated as Informatic Engineering at Politecnico di Milano"}
            </li>
            <li>{"Worked 2 years at frontend developer"}</li>
            <li>{"Worked 1 yearin automotive sector"}</li>
            <li>
              {
                "Almost 10 yearsof experience like developer with a lot of different projects, more or less complex, done also in University and in free time"
              }
            </li>
            <li>
              {"Speaks fluently 2 languages, currently visited 10 countries"}
            </li>
          </ul>
        </div>
      </div>
      <div className="card mb-2 mt-2 mx-auto">
        <div className="card-body bg-light p-2">
          <img
            src={
              "https://traveltips-a9abd.web.app/images/matchings/Ale%20matching.jpg"
            }
            className="card-img-top"
            alt=""
          />
          <h5 className="card-title text-center">Alessadro Pastorini</h5>
          <ul>
            <li>{"Educated at IED University"}</li>
            <li>
              {"Worked 2 years at Lualdi doors as Sales and Design Assistant"}
            </li>
            <li>{"Worked 4 years at Rimadesio as Export Area Manager"}</li>
            <li>{"worked 2 years in Molteni&C Dada as EMEA Export Manager"}</li>
            <li>
              {
                "Alessandro speaks fluently 5 languages, currently visited 66 countries"
              }
            </li>
          </ul>
          <p></p>
        </div>
      </div>

      <div className="card mb-2 mt-2 mx-auto">
        <div className="card-body bg-light p-2">
          <img
            src={
              "https://traveltips-a9abd.web.app/images/matchings/Alberto%20matching.jpg"
            }
            className="card-img-top"
            alt=""
          />
          <h5 className="card-title text-center">Alberto Schena</h5>
          <ul>
            <li>{"Educated at Bocconi University"}</li>
            <li>
              {
                "Master Degree in Creative Business Processes at Copenhagen Business School"
              }
            </li>
            <li>
              {
                "Worked 2 years at Aw Media specialized in Digital Marketing and Lead Generation"
              }
            </li>
            <li>
              {
                "Worked 5 years at the TJX Companies first as a Merchandiser and later as a Buyer"
              }
            </li>
            <li>
              {
                "Alberto speaks fluently 5 languages, currently visited 31 countries"
              }
            </li>
          </ul>
        </div>
      </div>
    </Page>
  );
}

export default About;
