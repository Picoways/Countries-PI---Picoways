import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { getCountryDetails, deleteActivity, getAllCountries } from '../redux/actions'
import Style from "./CountryDetails.module.css"
import Plane from "../Plane.png"
import Background from "../DetailsBackground.jpg"
import VolleyBall from "../VolleyBall.webp";


export default function CountryDetails() {
  const dispatch = useDispatch()
  const countryDetails = useSelector(state => (state.countries))

  const { id } = useParams()

  console.log(countryDetails)

  useEffect(() => {
    dispatch(getCountryDetails(id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={Style.order5}>
      <Link to="/homepage">
        <button className={Style.buttonback}>
          <img src={Plane}
            height="36px" width="36px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" alt="Not Found">
          </img>
          <span className={Style.now}>HOME</span>
          <span className={Style.play}>GO BACK!</span>
        </button>
      </Link>
      <div className={Style.detailscontainer}>
        <img className={Style.flagimage} src={countryDetails[0].flags} alt="Not Found" />
        <img className={Style.backimage} src={Background} alt="Not Found" />
        <h1 className={Style.fonts}>ID: {countryDetails[0].id}</h1>
        <h1 className={Style.fonts}>Name: {countryDetails[0].name}</h1>
        <h1 className={Style.fonts}>Continent: {countryDetails[0].continents}</h1>
        <h1 className={Style.fonts}>Capital: {countryDetails[0].capital}</h1>
        <h1 className={Style.fonts}>Subregion: {countryDetails[0].subregion}</h1>
        <h1 className={Style.fonts}>Area: {countryDetails[0].area} KM²</h1>
        <h1 className={Style.fonts}>Population: {countryDetails[0].population}</h1>
        {countryDetails[0].activities && countryDetails[0].activities.length > 0 ?
          <div className={Style.activitiescontainer}>
            <h1 className={Style.fonts3}>Activities:</h1> <div className={Style.activitiesorder}>{countryDetails[0].activities.map((a, i) =>
              <div className={Style.fonts2} key={i}>
                <a href={"/homepage/countries/" + countryDetails[0].id} type="button" onClick={() => {
                  dispatch(deleteActivity(a.id, i));
                  alert("The activity was succesfully deleted")
                }} className={Style.buttondelete}>X</a>
                <div className={Style.fontsname}>Name: {a.name}</div>
                <div className={Style.fontsdifficulty}>Difficulty: ⭐{a.difficulty} </div>
                <div className={Style.fontsduration}>Duration: {a.duration}hs</div>
                <div className={Style.fontsseason}>Season: {a.season}</div>
              </div>
            )}
            </div>
          </div> :
          <div className={Style.activitiescontainer}>
            <h1 className={Style.fonts3}>This country has no activities at the moment, you can add one if you want!</h1>
            <div>
              <div className={Style.createacitivity}>
                <Link
                  to="/homepage/addActivity"
                  onClick={() => dispatch(getAllCountries())}
                >
                  <button className={Style.buttonadddetails}>
                    <img
                      src={VolleyBall}
                      height="36px"
                      width="36px"
                      viewBox="0 0 36 36"
                      xmlns="http://www.w3.org/2000/svg"
                      alt="Not Found"
                    />
                    <span className={Style.now3}>NOW!</span>
                    <span className={Style.play3}>ADD ACTIVITY</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}
