import {
  GET_ALL_COUNTRIES, GET_COUNTRY_BY_QUERY, LOADING_COUNTRIES, ORDER_ALPHABETICALLY, ORDER_BY_CONTINENT, ORDER_BY_POPULATION,
  GET_ALL_COUNTRIES_COPY, GET_COUNTRY_BY_QUERY_COPY, ORDER_BY_ACTIVITY, GET_COUNTRY_DETAILS, DELETE_ACTIVITY
} from "./actions"

const initialState = {
  countries: "Loading",
  countriesCopy: []
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COUNTRIES:
      return { ...state, countries: action.payload }

    case GET_ALL_COUNTRIES_COPY:
      return { ...state, countriesCopy: action.payload }

    case GET_COUNTRY_BY_QUERY:
      return { ...state, countries: action.payload }

    case GET_COUNTRY_BY_QUERY_COPY:
      return { ...state, countriesCopy: action.payload }

    case LOADING_COUNTRIES:
      return { ...state, countries: action.payload }

    case ORDER_ALPHABETICALLY:
      return { ...state, countries: state.countriesCopy }

    case ORDER_BY_CONTINENT:
      if (action.payload === "Default") {
        return { ...state, countries: state.countriesCopy }
      }
      return { ...state, countries: state.countriesCopy.filter((e) => e.continents === action.payload) }

    case ORDER_BY_POPULATION:
      return { ...state, countries: state.countriesCopy.filter((e) => e.population === action.payload) }

    case ORDER_BY_ACTIVITY:
      if (action.payload === "Default") {
        return { ...state, countries: state.countriesCopy }
      }
      return { ...state, countries: state.countriesCopy.filter((e) => e.activities.map(a => a.name).includes(action.payload)) }

    case GET_COUNTRY_DETAILS:
      return { ...state, countries: action.payload }

    case DELETE_ACTIVITY:
      let aux = state.countries
      return { ...state, countries: aux}

    default:
      return state
  }
}

export default rootReducer;