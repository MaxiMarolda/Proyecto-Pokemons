import React from "react";
import './Card.css'

export default function Card({name, img, types}) {
  return (
    <div className="PokeCard">
      {console.log("Entre")
      }
      <h3>{name.toUpperCase()}</h3>
      <h5>{types}</h5>
      <img src={img} alt="no se eoncontró la imagen" width="200px" height="250" />
    </div>
  )
}