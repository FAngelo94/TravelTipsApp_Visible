import React from "react";
import { Icons } from "./../";

function Header(props) {
  const [isOpen, showMenu] = React.useState(false);

  const handleMenu = () => {
    showMenu(!isOpen);
  };

  const optionPressed = (page) => {
    props.history.push(page);
  };

  let links = [
    {
      link: "/cities",
      name: window.dic("Cities"),
    },
    {
      link: "/tips",
      name: window.dic("Tips"),
    },
    {
      link: "/itineraries",
      name: window.dic("Itineraries"),
    },
    {
      link: "/experiences",
      name: window.dic("Experiences"),
    },
    {
      link: "/travelers",
      name: window.dic("Travelers"),
    }
  ];
  if (localStorage.getItem("user")) {
    links.push({
      link: "/profile/" + JSON.parse(localStorage.getItem("user")).id,
      name: window.dic("Profile"),
    });
  } else {
    links.push({
      link: "/login/",
      name: "Login",
    });
  }
  links.push({
    link: "/about/",
    name: "About",
  })


  const language = localStorage.getItem("language") || "Italiano";
  const changeLanguage = (newLanguage) => {
    localStorage.setItem("language", newLanguage);
    props.history.go(0);
  };
  const [langIsOpen, handleLangIsOpen] = React.useState(false);

  return (
    <nav className="navbar navbar-expand-md fixed-top navbar-light bg-primary bg-gradient">
      <div className="container">
        <button
          className="navbar-toggler d-block me-1 p-0 border-0"
          type="button"
          onClick={() => optionPressed("/")}
        >
          <Icons.House />
        </button> 
        <p className="h3 m-0 d-md-none">{props.title}</p>
        <button
          className="navbar-toggler p-0 border-0"
          type="button"
          onClick={handleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
        className={`navbar-collapse offcanvas-collapse bg-primary bg-gradient ${
          isOpen && "open"
        }`}
        id="navbarsExampleDefault"
      >
        <ul className="navbar-nav me-auto">
          {links.map((item, index) => (
            <li className="nav-item" key={index}>
              <a className="nav-link text-dark" href={item.link}>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle w-100"
            type="button"
            onClick={() => handleLangIsOpen(!langIsOpen)}
          >
            {language}
          </button>
          <ul
            className={`dropdown-menu w-100 text-center ${
              langIsOpen && "show"
            }`}
          >
            <li>
              <a
                className="dropdown-item"
                onClick={() => changeLanguage("Italiano")}
              >
                Italiano
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() => changeLanguage("English")}
              >
                English
              </a>
            </li>
          </ul>
        </div>
      </div>
    
      </div>
    </nav>
  );
}

{
  /* <form className="d-flex my-2 my-lg-0">
  <button className="btn btn-dark my-2 my-sm-0 me-2" type="submit">
    Search
  </button>
  <input
    className="form-control"
    type="text"
    placeholder="Search"
    aria-label="Search"
  />
</form>;
 */
}
export default Header;
