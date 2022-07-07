import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  getAllCountries,
  getCountryByQuery,
  loadingCountries,
  orderByContinent,
  getAllCountriesCopy,
  getCountryByQueryCopy,
  orderByActivity,
} from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Card from "./Card";
import Style from "./Home.module.css";
import Plane from "../Plane.png";
import NotFoundBackground from "../PlaneCrashing.jpg";
import Background from "../Home&LandingBackground.jpg";
import VolleyBall from "../VolleyBall.webp";

export default function Home() {
  const dispatch = useDispatch();
  let countries = useSelector((state) => state.countries);
  const countriesCopy = useSelector((state) => state.countriesCopy);

  useEffect(() => {
    dispatch(getAllCountries());
    dispatch(getAllCountriesCopy());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [page2, setPage2] = useState(10);
  const [page1, setPage1] = useState(0);

  const [name, setName] = useState("");

  const loadingScreen = async () => {
    await dispatch(loadingCountries());
    dispatch(getCountryByQuery(name));
    dispatch(getCountryByQueryCopy(name));
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    if (name.length === 0) {
      if (e.key === "Enter") {
        alert("You need to type at least 1 character before searching");
      }
    }
    if (name.length > 0) {
      if (e.key === "Enter") {
        loadingScreen();
        setPage1(0);
        setPage2(10);
      }
    }
    
    console.log(e.target.value);
  };

  const handleSubmitClick = (e) => {
    e.preventDefault()
    if(name.length === 0){
      alert("You need to type at least 1 character before searching")
    }
    if(name.length > 0){
      loadingScreen();
      setPage1(0);
      setPage2(10);
    }
  }


  const [updater, setUpdater] = useState(true);

  const handleOrderAToZ = (e) => {
    if (e === "A-Z") {
      countries.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        return 0;
      });
    }
    if (e === "Z-A") {
      countries.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
        return 0;
      });
    }
    if (e === "default") {
      if (name.length > 0) {
        dispatch(getCountryByQuery(name));
      } else {
        dispatch(getAllCountries());
      }
    }
    setUpdater(!updater);
  };

  const handleOrderByPopulation = (e) => {
    if (e === "Low to High") {
      countries.sort((a, b) => {
        if (Number(a.population) > Number(b.population)) return 1;
        if (Number(a.population) < Number(b.population)) return -1;
        return 0;
      });
    }
    if (e === "High to Low") {
      countries.sort((a, b) => {
        if (Number(a.population) < Number(b.population)) return 1;
        if (Number(a.population) > Number(b.population)) return -1;
        return 0;
      });
    }
    if (e === "default") {
      if (name.length > 0) {
        dispatch(getCountryByQuery(name));
      } else {
        dispatch(getAllCountries());
      }
    }
    setUpdater(!updater);
  };

  return (
    <div>
      {typeof countries === "string" &&
        countries === "No countries were found" ? (
        <div>
          <div className={Style.planecursor} />
          <img
            className={Style.backgroundimage}
            src={NotFoundBackground}
            alt="Not Found"
          />
        </div>
      ) : (
        <img
          className={Style.backgroundimage}
          src={Background}
          alt="Not Found"
        />
      )}
      <div className={Style.selectpositioningleft}>
        <div className={Style.createacitivity}>
          <Link
            to="/homepage/addActivity"
            onClick={() => dispatch(getAllCountries())}
          >
            <button className={Style.buttonadd}>
              <img
                src={VolleyBall}
                height="36px"
                width="36px"
                viewBox="0 0 36 36"
                xmlns="http://www.w3.org/2000/svg"
                alt="Not Found"
              />
              <span className={Style.now}>NOW!</span>
              <span className={Style.play}>ADD ACTIVITY</span>
            </button>
          </Link>
        </div>
        {Array.isArray(countries) ? (
          <div className={Style.select}>
            <select onChange={(e) => dispatch(orderByActivity(e.target.value))}>
              <option value="asd" disabled selected={true}>
                Filter by activity
              </option>
              <option value="Default">Default</option>
              {Array.isArray(countries) &&
                countries
                  .filter((e) => e.activities.length > 0)
                  .map((h) => h.activities.map((m) => m.name))
                  .flat()
                  .filter((item, index) => {
                    return (
                      countries
                        .filter((e) => e.activities.length > 0)
                        .map((h) => h.activities.map((m) => m.name))
                        .flat()
                        .indexOf(item) === index
                    );
                  })
                  .map((x) => (
                    <option value={x} key={x}>
                      {x}
                    </option>
                  ))}
            </select>
          </div>
        ) : (
          <div />

        )}
        {
          countries.length < 250 && countries !== "No countries were found" && countries !== "Loading" &&
          <div >
            <button className={Style.refreshbutton} onClick={() => { setPage1(0); setPage2(10); setName(""); dispatch(getAllCountries()); dispatch(getAllCountriesCopy()) }}
            > <span>REFRESH</span>
            </button>
          </div>}
      </div>
      {Array.isArray(countries) ? (
        <div className={Style.selectpositioningright}>
          <div className={Style.select}>
            <select
              onChange={(e) => dispatch(orderByContinent(e.target.value))}
            >
              <option value="asd" disabled selected={true}>
                Filter by continent
              </option>
              <option value="Default">Default</option>
              {Array.isArray(countriesCopy) &&
                countriesCopy
                  .map((e) => e.continents)
                  .filter((item, index) => {
                    return (
                      countriesCopy.map((e) => e.continents).indexOf(item) ===
                      index
                    );
                  })
                  .map((x) => (
                    <option value={x} key={x}>
                      {x}
                    </option>
                  ))}
            </select>
          </div>
          <div>
            <div className={Style.select}>
              <select onChange={(e) => handleOrderByPopulation(e.target.value)}>
                <option value="asd" disabled selected={true}>
                  Order by population
                </option>
                <option value="default">Default</option>
                <option value="Low to High">Low to High</option>
                <option value="High to Low">High to Low</option>
              </select>
            </div>
          </div>
          <div>
            <div className={Style.select}>
              <select onChange={(e) => handleOrderAToZ(e.target.value)}>
                <option value="asd" disabled selected={true}>
                  Order alphabetically
                </option>
                <option value="default">Default</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
              </select>
            </div>
          </div>
        </div>
      ) : (
        <div className={Style.selectpositioningright}>
          <button
            onClick={() => { dispatch(getAllCountries()); setName("") }}
            className={Style.buttonadd2}
          >
            <img
              src={Plane}
              height="36px"
              width="36px"
              viewBox="0 0 36 36"
              xmlns="http://www.w3.org/2000/svg"
              alt="Not Found"
            />
            <span className={Style.now2}>HOME</span>
            <span className={Style.play2}>GO BACK!</span>
          </button>
        </div>
      )}
      <div className={Style.navbar}>
        <div className={Style.prevbutton}>
          {typeof countries !== "string" && page1 - 10 >= 0 ? (
            <div
              className={Style.scrolldown}
              onClick={() => {
                setPage1(page1 - 10);
                setPage2(page2 - 10);
              }}
              style={{ color: "yellow" }}
            >
              <div className={Style.aia}>Prev</div>
              <div className={Style.chevrons}>
                <div className={Style.chevrondown}></div>
                <div className={Style.chevrondown}></div>
              </div>
            </div>
          ) : (
            <div className={Style.scrolldown3} style={{ color: "grey" }}>
              <div className={Style.aia3}>Prev</div>
              <div className={Style.chevrons3}>
                <div className={Style.chevrondown3}></div>
                <div className={Style.chevrondown3}></div>
              </div>
            </div>
          )}
        </div>
        <div className={Style.input_models}>
          <input
            onKeyPress={handleSubmit}
            onChange={handleChange}
            value={name}
            type="text"
            className={Style.input}
            placeholder="Enter country..."
            autoComplete="off"
          />
          <button
            onClick={(e) => {
              handleSubmitClick(e)
              setPage1(0);
              setPage2(10);
            }}
            className={Style.button_submit}
            type="submit"
          >
            Search
          </button>
        </div>
        <div className={Style.nextbutton}>
          {typeof countries !== "string" && page2 + 10 <= countries.length ? (
            <div
              className={Style.scrolldown2}
              onClick={() => {
                setPage1(page1 + 10);
                setPage2(page2 + 10);
              }}
              style={{ color: "yellow" }}
            >
              <div className={Style.aia2}>Next</div>
              <div className={Style.chevrons2}>
                <div className={Style.chevrondown2}></div>
                <div className={Style.chevrondown2}></div>
              </div>
            </div>
          ) : (
            <div className={Style.scrolldown3} style={{ color: "grey" }}>
              <div className={Style.aia3}>Next</div>
              <div className={Style.chevrons3}>
                <div className={Style.chevrondown3}></div>
                <div className={Style.chevrondown3}></div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className={Style.pagingpositioning}>
        {Array.isArray(countries) && (
          <div className={Style.containerpaging}>
            {
              page1 >= 30 && <p className={Style.paging} onClick={() => {setPage1(0); setPage2(10)}}>1...</p>
            }

            {Array.isArray(countries) &&
              Array.from({ length: Math.ceil(countries.length / 10) }, (v, i) => i + 1).slice(
                (page1 / 10 - 2) >= 0 ? (page1 / 10 - 2) : 0, (page1 / 10 - 2) >= 0 ? (page2 / 10 + 2) : (page2 / 10 + 4)
              ).map((e, i) => <p className={Style.paging} onClick={() => {
                setPage1((e - 1) * 10);
                setPage2((e) * 10);
              }}>{e}</p>)
            }
            {page2 + 20 < countries.length && <p className={Style.paging} onClick={() => { setPage1((Math.ceil(countries.length / 10) - 1) * 10); setPage2(Math.ceil(countries.length / 10) * 10) }}
            >...{Math.ceil(countries.length / 10)}</p>}
          </div>
        )}
      </div>
      <div className={Style.order}>
        {Array.isArray(countries) ? (
          countries
            .slice(page1, page2)
            .map((e) => (
              <Card
                name={e.name.length > 15 ? e.name.slice(0, 15) + "..." : e.name}
                continents={e.continents}
                flags={e.flags}
                id={e.id}
                population={e.population}
              ></Card>
            ))
        ) : typeof countries === "string" && countries === "Loading" ? (
          <div className={Style.loadinglocation}>
            <div className={Style["loadingio-spinner-radio-33r748hx465"]}>
              <div className={Style["ldio-27154ayxed4"]}>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        ) : (
          <h1 className={Style.notfoundmessage}>{countries}</h1>
        )}
      </div>
    </div>
  );
}
