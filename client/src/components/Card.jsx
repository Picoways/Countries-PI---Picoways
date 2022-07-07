import React from 'react'
import Style from "./Card.module.css"
import { Link } from 'react-router-dom'

export default function Card(props) {
    return (
        <div className={Style.container}>
            <div className={Style.card}>
                <img src={props.flags} className={Style.card2} alt="Not Found"></img>
                <Link to={"/homepage/countries/" + props.id}>
                    <img src={props.flags} className={Style.card_img} alt="Not Found"></img>
                </Link>
            </div>
            <div className={Style.card_info}>
                <p className={Style.text_body}>
                    {
                        props.name
                    }
                </p>
                <p className={Style.text_title}>
                    {
                        props.continents
                    }
                </p>
                <p className={Style.text_pop}>
                    {
                        "Inhabitants: " + props.population
                    }
                </p>
            </div>
        </div>
    )
}

