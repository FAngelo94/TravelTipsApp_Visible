import { experienceConstants } from "../constants";

const init_state = {
  list: [],
  listBooked: []
};

export function experience(state = init_state, action) {
  let new_state = {};
  new_state["list"] = [...state["list"]];
  new_state["listBooked"] = [...state["listBooked"]];
  switch (action.type) {
    case experienceConstants.ADD_REQUEST:
      new_state["requesting"] = true;
      break;
    case experienceConstants.ADD_SUCCESS:
      new_state["completed"] = true;
      break;
    case experienceConstants.ADD_FAILURE:
      break;
    case experienceConstants.GET_REQUEST:
      new_state["requesting"] = true;
      break;
    case experienceConstants.GET_SUCCESS:
      new_state["completed"] = true;
      new_state["list"] = action.data;
      break;
    case experienceConstants.GET_FAILURE:
      break;
    case experienceConstants.GET_BOOKED_REQUEST:
      new_state["requesting"] = true;
      break;
    case experienceConstants.GET_BOOKED_SUCCESS:
      new_state["completed"] = true;
      new_state["listBooked"] = action.data;
      break;
    case experienceConstants.GET_BOOKED_FAILURE:
      break;
    case experienceConstants.DELETE_REQUEST:
      new_state["requesting"] = true;
      break;
    case experienceConstants.DELETE_SUCCESS:
      new_state["completed"] = true;
      new_state["list"] = new_state["list"].filter(
        (x) => x.id !== action.data.id
      );
      break;
    case experienceConstants.DELETE_FAILURE:
      break;
    case experienceConstants.DELETE_BOOK_DATE_REQUEST:
      new_state["requesting"] = true;
      break;
    case experienceConstants.DELETE_BOOK_DATE_SUCCESS:
      new_state["completed"] = true;
      new_state["listBooked"] = new_state["listBooked"].filter(b => b.date != action.data.date || b.id != action.data.id)
      break;
    case experienceConstants.DELETE_BOOK_DATE_FAILURE:
      break;
    case experienceConstants.DELETE_DATE_REQUEST:
      new_state["requesting"] = true;
      break;
    case experienceConstants.DELETE_DATE_SUCCESS:
      new_state["completed"] = true;
      new_state["list"].filter(i=>i.id===action.data.id)[0]['dates'] = new_state["list"].filter(i=>i.id===action.data.id)[0]['dates'].filter(d => d['date']!=action.data.date)
      break;
    case experienceConstants.DELETE_DATE_FAILURE:
      break;
    case experienceConstants.UPDATE_REQUEST:
      new_state["requesting"] = true;
      break;
    case experienceConstants.UPDATE_SUCCESS:
      new_state["completed"] = true;
      for (let i = 0; i < new_state["list"].length; i++) {
        if (new_state["list"][i]["id"] === action.data.id) {
          new_state["list"][i]["city"] = action.data.city;
          new_state["list"][i]["country"] = action.data.country;
          new_state["list"][i]["languages"] = action.data.languages.replace(",", ", ");
          new_state["list"][i]["province"] = action.data.province;
          new_state["list"][i]["tags"] =
            "#" + action.data.tags.replace(",", " #");
          new_state["list"][i]["text"] = action.data.text;
          new_state["list"][i]["title"] = action.data.title;
        }
      }
      break;
    case experienceConstants.UPDATE_FAILURE:
      break;
    case experienceConstants.PUT_BOOK_DATE_REQUEST:
      new_state["requesting"] = true;
      break;
    case experienceConstants.PUT_BOOK_DATE_SUCCESS:
      new_state["completed"] = true;
      new_state["listBooked"].push({
        date: action.data.date,
        id: action.data.id,
        places: action.data.places,
        title: new_state['list'].filter(i => i.id === action.data.id)[0]['title']
      })
      break;
    case experienceConstants.PUT_BOOK_DATE_FAILURE:
      break;
    case experienceConstants.PUT_DATE_REQUEST:
      new_state["requesting"] = true;
      break;
    case experienceConstants.PUT_DATE_SUCCESS:
      new_state["completed"] = true;
      new_state["list"].filter(i=>i.id===action.data.id)[0]['dates'].push({
        booked: 0,
        availablePlaces: action.data.places,
        date: action.data.date,
        idExperience: action.data.id,
      })
      break;
    case experienceConstants.PUT_DATE_FAILURE:
      break;
    case experienceConstants.UPDATE_VOTE_REQUEST:
      new_state["requesting"] = true;
      break;
    case experienceConstants.UPDATE_VOTE_SUCCESS:
      new_state["completed"] = true;
      break;
    case experienceConstants.UPDATE_VOTE_FAILURE:
      break;
    default:
      break;
  }
  return new_state;
}
