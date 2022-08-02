import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getPokemonsByName, getPokemons} from '../actions/index';
import {Link } from "react-router-dom";
import './SearchBar.css'

export default function SearchBar ({setCurrentPage}) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  //const renderState = useSelector ((state) => state.render);
  const allPokemons = useSelector ((state) => state.allPokemons);

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
    setCurrentPage(1);
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
          placeholder = 'Pokemon search...'
          onChange = {e => handleInputChange(e)}
          />
          <button 
          type = 'submit'
          onClick = {e => handleSubmit(e)}
          >Search</button>
      </label>
      <button onClick={e=> {handleOnClick(e)}}>
        Reload all Pokemons
      </button>
      <Link to = '/pokemon/create'>
        <button>Create your own Pokemon </button>
      </Link>
      <Link to = '/'>
        <button>Back to Landing page</button>
      </Link>
      <datalist id="Pokemons">
          {pokeNames.map((poke,index) => {
            return(
                  <option key= {index} value={poke}></option>
                  )})}
      </datalist>
    </div>
  )

}