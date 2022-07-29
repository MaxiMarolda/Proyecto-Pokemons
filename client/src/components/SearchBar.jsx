import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getPokemonsByName, getPokemons} from '../actions/index';
import {Link } from "react-router-dom";
import './SearchBar.css'

export default function SearchBar () {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  //const renderState = useSelector ((state) => state.render);
  const allPokemons = useSelector ((state) => state.pokemons);

  function handleOnClick (e) {
    e.preventDefault();
    dispatch(getPokemons());
  };

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }

  function handleSubmit() {
    dispatch(getPokemonsByName(name));
    setName("");
  }

  const pokeNames = allPokemons.map (e => e.name)
  return (
    <div className="SearchBar">
      <label>
        <input
          list='Pokemons'
          value={name}
          type = 'text'
          placeholder = 'Buscar Pokemon ...'
          onChange = {e => handleInputChange(e)}
          />
          <button 
          type = 'submit'
          onClick = {e => handleSubmit(e)}
          >Buscar</button>
      </label>
      <Link to = '/pokemon/create'>
        <button>Pokemon Create</button>
      </Link>
      <button onClick={e=> {handleOnClick(e)}}>
        Reload all Pokemons
      </button>
      <datalist id="Pokemons">
          {pokeNames.map((poke,index) => {
            return(
                  <option key= {index} value={poke}></option>
                  )})}
      </datalist>
    </div>
  )

}