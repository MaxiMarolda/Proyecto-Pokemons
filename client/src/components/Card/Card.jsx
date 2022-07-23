import React from "react";
import './Card.css'

export default function Card({nombre, img, tipos}) {
  return (
    <div className="PokeCard">
      {//console.log("Entre")
      }
      <h3>{nombre}</h3>
      <h5>{tipos}</h5>
      <img src={img} alt="no se eoncontró la imagen" width="200px" height="250" />
    </div>
  )
}