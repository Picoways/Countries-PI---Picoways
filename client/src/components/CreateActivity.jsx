import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom"
import { createNewActivity, getAllCountries, getAllCountriesCopy, getCountryByQueryCopy, getCountryByQuery, loadingCountries } from '../redux/actions'
import Style from "./CreateActivity.module.css"
import Plane from "../Plane.png"
import Background from "../CreateActivityBackground.jpg"

export default function CreateActivity() {

  const dispatch = useDispatch()
  const countries = useSelector(state => (state.countries))
  const [errors, setErrors] = useState({})
  const [name, setName] = useState("")

  useEffect(() => {
    if (!Array.isArray(countries)) {
      dispatch(getAllCountries())
      dispatch(getAllCountriesCopy())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const navigation = useNavigate()

  const [input, setInput] = useState({
    name: "",
    difficulty: "0",
    duration: "",
    season: "",
    countries: []
  })

  const addCountry = (countryAdded) => {
    setInput({
      ...input, countries: [...input.countries, countryAdded]
    })
  }

  const removeCountry = (countryRemoved) => {
    setInput({
      ...input, countries: input.countries.filter(e => e.id !== countryRemoved)
    })
  }

  const onChange = (e) => {
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }))
  }

  const handleChange = (e) => {
    setName(e.target.value)
  }

  const loadingScreen = async () => {
    await dispatch(loadingCountries())
    dispatch(getCountryByQuery(name))
    dispatch(getCountryByQueryCopy(name))
  }

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      loadingScreen();
    }
    console.log(e.target.value)
  }

  const validate = (input) => {
    let errors = {}
    if (input.season !== "Summer" && input.season !== "Winter" && input.season !== "Autumn" && input.season !== "Spring") {
      errors.season = "Can only be the following: Summer, Winter, Autumn, Spring"
    }
    if (input.duration.length !== 5 || input.duration[2] !== ":") {
      errors.duration = "Duration has to have the following format: 12:34"
    }
    if (input.name.length < 1) {
      errors.name = "The activity requires a name"
    }
    if (input.difficulty === "0") {
      errors.difficulty = "Must set a difficulty level"
    }
    return errors
  }



  return (
    <div className={Style.orderform}>
      <Link to="/homepage">
        <button className={Style.buttonback}>
          <img src={Plane}
            height="36px" width="36px" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" alt="Not Found">
          </img>
          <span className={Style.now}>HOME</span>
          <span className={Style.play}>GO BACK!</span>
        </button>
      </Link>
      <div className={Style.container}>
        <div>
          <img className={Style.backgroundform} src={Background} alt="Not Found" />
          <div className={Style.inputsorder}>
            <div className={Style.form__group}>
              <input required="" placeholder="Name" className={Style.form__field} type="input" name="name" value={input.name}
                onChange={(e) => onChange(e)} />
              <label className={Style.form__label} for="name">Name</label>
            </div>
            <div className={Style.form__group}>
              <input required="" placeholder="Name" className={Style.form__field} type="time" name="duration" value={input.duration}
                onChange={(e) => onChange(e)} />
              <label className={Style.form__label} for="name">Duration</label>
            </div>
            <div className={Style.form__group}>
              <input required="" placeholder="Name" className={Style.form__field} type="text" value={input.season} name="season"
                onChange={(e) => onChange(e)} />
              <label className={Style.form__label} for="name">Season</label>
            </div>
          </div>
          <div className={Style.errorpositioning}>
            {
              errors.name && (
                <div className={Style.error3}>{errors.name}</div>
              )
            }
            {
              errors.duration && (
                <div className={Style.error2}>{errors.duration}</div>
              )
            }
            {
              errors.season && (
                <div className={Style.error}>{errors.season}</div>
              )
            }
          </div>
          <div className={Style.starspositioning}>
            <div className={Style.searchbar}>
              <div className={Style.form__group}>
                <input required="" placeholder="Enter country..." className={Style.form__field} onKeyPress={handleSubmit} onChange={handleChange}
                  value={name} type="text" />
                <label className={Style.form__label} for="name">Search country</label>
              </div>
            </div>
            <div className={Style.difficultycontainer}>
              <label style={{ color: "white" }}>Difficulty: </label>
              <input type="range" name="difficulty" min="0" max="5" value={input.difficulty} onChange={(e) => onChange(e)}></input>
              <div style={{display:"flex"}}>{input.difficulty > 0 ? <><h1>⭐</h1></>
                :
                <h1 style={{ color: "transparent", userSelect: "none" }}>⭐</h1>}
                {input.difficulty > 1 ? <><h1>⭐</h1></>
                  :
                  <h1 style={{ color: "transparent", userSelect: "none" }}>⭐</h1>}
                {input.difficulty > 2 ? <><h1>⭐</h1></>
                  :
                  <h1 style={{ color: "transparent", userSelect: "none" }}>⭐</h1>}
                {input.difficulty > 3 ? <><h1>⭐</h1></>
                  :
                  <h1 style={{ color: "transparent", userSelect: "none" }}>⭐</h1>}
                {input.difficulty > 4 ? <><h1>⭐</h1></>
                  :
                  <h1 style={{ color: "transparent", userSelect: "none" }}>⭐</h1>}
              </div>
            </div>
          </div>
          <div className={Style.errorpositioning2}>
            {
              errors.difficulty && (
                <div className={Style.error4}>{errors.difficulty}</div>
              )
            }
          </div>
          <div className={Style.ordercountrybar}>
            <div className={Style.ordertitlebar}>
              <div className={Style.orderword1}>
                <div style={{ display: "flex" }}>
                  <h1 className={Style.selectframe}>✈</h1>
                  <div className={Style.selectframe2}>
                    <h2>SELECT</h2>
                    <h1>🢃</h1>
                  </div>
                </div>
              </div>
              <div className={Style.countrybar}>
                {
                  Array.isArray(countries) && countries.filter(function (item) { return !input.countries.includes(item) }).map(e => <div> {
                    !input.countries.map(a => a.id === e.id).includes(true) &&
                    <div onClick={() => addCountry(e)}>
                      <p className={Style.title}>{e.name.length > 20 ? e.name.slice(0, 15) + "..." : e.name}</p>
                      <img className={Style.flagselect} src={e.flags} alt="Not Found" />
                    </div>
                  }
                  </div>)
                }
              </div>
            </div>
            <div className={Style.ordertitlebar}>
              <div className={Style.orderword1}>
                <div style={{ display: "flex" }}>
                  <h1 className={Style.selectframe}>✈</h1>
                  <div className={Style.selectframe2}>
                    <h2>SELECTED</h2>
                    <h1>🢃</h1>
                  </div>
                </div>
              </div>
              <div className={Style.countrybar2}>
                {
                  input.countries.length > 0 && input.countries.map(e => <div onClick={() => removeCountry(e.id)}>
                    <p className={Style.title}>{e.name.length > 20 ? e.name.slice(0, 15) + "..." : e.name}</p>
                    <img className={Style.flagselect} src={e.flags} alt="Not Found" />
                  </div>)
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      {
        input.name.length > 0 && input.duration.length === 5 && input.duration[2] === ":" && input.difficulty !== "0" &&
          (input.season === "Summer" || input.season === "Winter" || input.season === "Autumn" || input.season === "Spring") && input.countries.length > 0
          ?
          <button className={Style.createbutton} type="submit" onClick={() => dispatch(createNewActivity(input, navigation))}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span>CREATE!</span>
          </button>
          :
          <button className={Style.createbutton} type="submit" onClick={() => alert("You must complete all the fields to create a new activity")}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span>CREATE!</span>
          </button>
      }
    </div>
  )
}