import React from "react";
import {Link} from "react-router-dom";
import './Card.css';

export default function Card({id, name, hp, img, type}) {

 
  return (
    <div className="PokeCard">
      {//console.log(type.length)
      }{//console.log(currentPage)
      }
      <Link className="PokeLink" to={`/details/${id}`}>
        <h4>{name.toUpperCase()}</h4>
      </Link>
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
