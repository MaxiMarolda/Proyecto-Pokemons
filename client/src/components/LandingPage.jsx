import React from "react";
import {Link} from "react-router-dom";

export default function LandingPage(){
  return(
    <div>
      <h1>Bienvenidos a la App de Pokemones</h1>
      <h4>Esta es una App con propósito educativo y forma parte del boot camp de Henry</h4>
      <Link to = '/home'>
        <button>Ingreso</button>
      </Link>
    </div>
  )
}