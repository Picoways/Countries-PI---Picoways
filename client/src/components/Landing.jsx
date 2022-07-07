import React from 'react'
import Style from "./Landing.module.css"
import { Link } from "react-router-dom"
import Background from "../Home&LandingBackground.jpg"


export default function Landing() {
    return (
        <div>
            <img className={Style.backgroundimage} src={Background} alt="Not Found" />
            <div className={Style.positioning}>
                <Link to="/homepage" className={Style.linkbutton}>
                    <button className={Style.homebutton}>HOME</button>
                </Link>
            </div>

        </div>
    )
}
