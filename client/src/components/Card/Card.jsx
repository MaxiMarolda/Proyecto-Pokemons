import React from "react";
import './Card.css'

export default function Card({name, hp, img, type}) {
  return (
    <div className="PokeCard">
      {//console.log(type.length)}
      //{console.log(type[0])
      }
      <h4>{name.toUpperCase()}</h4>
      <h5>Types: {type.length === 0
                  ? ("No type available")
                  :type.length === 1 
                    ? type[0]
                    :type.length === 2 
                      ? (type[0] + " - " + type[1])
                      : (type[0] + " - " + type[1] + " - " + type[2]) }
      </h5>
      <h5>Attack: {hp}</h5>
      <img src={img} alt="no se encontró la imagen" />
    </div>
  )
}
