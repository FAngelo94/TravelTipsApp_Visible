const routes = {
  about: { path: "/about/", title: "About", key: "about" },
  cities: { path: "/cities/:filters?", title: "Cities", key: "cities" },
  experiences: {
    path: "/experiences/:filters?",
    title: "Experiences",
    key: "experiences",
  },
  forgottenPassword:{
    path: "/forgottenPassword/",
    title: "Forgotten Password",
    key: "forgottenPassword",
  },
  home: { path: "/", title: "Home", key: "home" },
  itineraries: {
    path: "/itineraries/:filters?",
    title: "Itineraries",
    key: "itineraries",
  },
  login: { path: "/login", title: "Login", key: "login" },
  placeReviews: {
    path: "/placeReviews/:id/:filters?",
    title: "Place Review",
    key: "placeReviews",
  },
  places: { path: "/places/:filters?", title: "Places", key: "places" },
  profile: { path: "/profile/:id/:filters?", title: "Profile", key: "profile" },
  registration: {
    path: "/registration",
    title: "Registration",
    key: "registration",
  },
  tips: { path: "/tips/:filters?", title: "Tips", key: "tips" },
  travelers: {
    path: "/travelers/:filters?",
    title: "Travelers",
    key: "travelers",
  },
};

export default routes;
