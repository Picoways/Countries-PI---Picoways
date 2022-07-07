import axios from "axios";

export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES"
export const GET_COUNTRY_BY_QUERY = "GET_COUNTRY_BY_QUERY"
export const LOADING_COUNTRIES = "LOADING_COUNTRIES"
export const ORDER_ALPHABETICALLY = "ORDER_ALPHABETICALLY"
export const ORDER_BY_CONTINENT = "ORDER_BY_CONTINENT"
export const ORDER_BY_POPULATION = "ORDER_BY_POPULATION"
export const ORDER_BY_ACTIVITY = "ORDER_BY_ACTIVITY"
export const GET_ALL_COUNTRIES_COPY = "GET_ALL_COUNTRIES_COPY"
export const GET_COUNTRY_BY_QUERY_COPY = "GET_COUNTRY_BY_QUERY_COPY"
export const GET_COUNTRY_DETAILS = "GET_COUNTRY_DETAILS"
export const CREATE_NEW_ACTIVITY = "CREATE_NEW_ACTIVITY"
export const DELETE_ACTIVITY = "DELETE_ACTIVITY"



export const getAllCountries = () => {
    return async function(dispatch){
        return await axios.get("https://countries-pi-picoways-api.vercel.app/countries")
        .then(r => dispatch({type:GET_ALL_COUNTRIES, payload:r.data}))
    }
}

export const getCountryByQuery = (name) => {
    return async function(dispatch){
        return await axios.get("https://countries-pi-picoways-api.vercel.app/countries?name=" + name)
        .then(r => dispatch({type:GET_COUNTRY_BY_QUERY, payload:r.data}))
    }
}

export const loadingCountries = () => {
    return async function(dispatch){
        return dispatch({type:LOADING_COUNTRIES, payload:"Loading"})
    }
}

export const orderAlphabetically = () => {
    return {type:ORDER_ALPHABETICALLY}
}

export const orderByContinent = (continent) => {
    return {type:ORDER_BY_CONTINENT, payload: continent}
}

export const orderByPopulation = (population) => {
    return {type:ORDER_BY_POPULATION, payload: population}
}

export const orderByActivity = (activity) => {
    return {type:ORDER_BY_ACTIVITY, payload: activity}
}

export const getAllCountriesCopy = () => {
    return async function(dispatch){
        return await axios.get("https://countries-pi-picoways-api.vercel.app/countries")
        .then(r => dispatch({type:GET_ALL_COUNTRIES_COPY, payload:r.data}))
    }
}

export const getCountryByQueryCopy = (name) => {
    return async function(dispatch){
        return await axios.get("https://countries-pi-picoways-api.vercel.app/countries?name=" + name)
        .then(r => dispatch({type:GET_COUNTRY_BY_QUERY_COPY, payload:r.data}))
    }
}

export const getCountryDetails = (id) => {
    return async function(dispatch){
        return await axios.get("https://countries-pi-picoways-api.vercel.app/countries/" + id)
        .then(r => dispatch({type:GET_COUNTRY_DETAILS, payload: r.data}))
    }
}

export const createNewActivity = (payload, navigation) => {
    return async function(dispatch){
        return await axios.post("https://countries-pi-picoways-api.vercel.app/activities", payload)
        .then(r => setTimeout(alert("The activity was added succesfully"), 3000), navigation(-1))
    }
}

export const deleteActivity = (id, id2) => {
    return async function(dispatch){
        return (await axios.delete("https://countries-pi-picoways-api.vercel.app/activities/" + id)
 /*        .then(dispatch(getCountryDetails(id2))) */
/*         .then(r => dispatch({type:GET_COUNTRY_DETAILS, payload: r.data}))) */
        /* .then(h => getCountryDetails(id2)) */
        .then(r => dispatch({type:DELETE_ACTIVITY, payload: id2})))
    }
}
