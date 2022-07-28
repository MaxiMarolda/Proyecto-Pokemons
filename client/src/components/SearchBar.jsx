import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getPokemonsByName} from '../actions/index';

export default function SearchBar () {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  //const renderState = useSelector ((state) => state.render);
  const allPokemons = useSelector ((state) => state.pokemons);



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
    <div>
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

      <datalist id="Pokemons">
          {pokeNames.map((poke,index) => {
            return(
                  <option key= {index} value={poke}></option>
                  )})}
      </datalist>
    </div>
  )

}