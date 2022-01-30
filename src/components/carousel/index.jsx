import React from "react";

function Carousel({ images,id }) {
  return (
    <div
      id={`carouselId${id}`}
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {images.map((img, index) => (
          <div key={index} className={`carousel-item responsive-container r-9-5 ${index === 0 && "active"}`}>
            <img src={window.images_url + img} className="d-block w-100 responsive-child-centered" alt={index} />
          </div>
        ))}
      </div>
      <a
        className="carousel-control-prev"
        href={`#carouselId${id}`}
        role="button"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href={`#carouselId${id}`}
        role="button"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </a>
    </div>
  );
}

export default Carousel;
