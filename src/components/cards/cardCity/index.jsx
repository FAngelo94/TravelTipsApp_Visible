import React from "react";
import Header from "../_header";

function CardCity({
  city,
  history,
}) {
  console.log(city)
  const goToPage = (page, filters='') => {
    let path = page + `/country=${city.country}&province=${city.province}&city=${city.city}`
    if(filters !== '')
      path = path + '&' + filters
    history.push(path);
  };

  return (
    <div className="card m-2 mx-auto">
      <Header
        text={`${city.country}, ${city.province}, ${city.city}`}
        id={city.id} 
      />
      <div className="card-body bg-light border border-primary d-flex flex-wrap justify-content-around p-1">
        <button type="button" className="btn btn-outline-primary btn-sm m-1" onClick={()=>goToPage('/places')}>
          {window.dic("Places")} - {city.places}
        </button>
        <button type="button" className="btn btn-outline-primary btn-sm m-1" onClick={()=>goToPage('/tips')}>
          Tips - {city.tips}
        </button>
        <button type="button" className="btn btn-outline-primary btn-sm m-1" onClick={()=>goToPage('/experiences')}>
          {window.dic("Experiences")} - {city.experiences}
        </button>
        <button type="button" className="btn btn-outline-primary btn-sm m-1" onClick={()=>goToPage('/itineraries')}>
          {window.dic("Itineraries")} - {city.itineraries}
        </button>
        <button type="button" className="btn btn-outline-primary btn-sm m-1" onClick={()=>goToPage('/travelers')}>
          {window.dic("Travelers")} - {city.travelers}
        </button>
        <button type="button" className="btn btn-outline-primary btn-sm m-1" onClick={()=>goToPage('/travelers','matching=yes')}>
          {window.dic("Matchings")} - {city.matchings}
        </button>
      </div>
    </div>
  );
}

export default CardCity;
