import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import { getTypes } from "../actions";



export default function LandingPage(){
  const dispatch = useDispatch();

  useEffect (() => {        // ON MOUNT
    dispatch(getTypes());

  },[dispatch]);

  return(
    <div>
      <h1>Wellcome to the Pokemons App</h1>
      <h3>This an App with educational purposes and is part of Henry's bootcamp</h3>
      <Link to = '/home'>
        <button className="AccessButton">Access</button>
      </Link>
    </div>
  )
}