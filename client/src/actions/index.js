import { GET_POKEMONS_BY_NAME ,FILTER_BY_ORIGIN, FILTER_BY_TYPE, GET_POKEMONS, GET_TYPES, SORT_BY_ORDER } from './actionTypes'
import axios from "axios";

export function getPokemons(){
  return async function(dispatch){
    var json = await axios.get("http://localhost:3001/pokemons",{
      
    });
    return dispatch({
      type: GET_POKEMONS,
      payload: json.data
    });
  }
};


export function postPokemon(payload){
  return async function(dispatch){  
    const response = await axios.post(`http://localhost:3001/pokemons`,payload);
    console.log(response);
    return response;
  }
};

export function getPokemonsByName(name){
  return async function(dispatch){
    var json = await axios.get(`http://localhost:3001/pokemons?name=${name}`,{
      
    });
    return dispatch({
      type: GET_POKEMONS_BY_NAME,
      payload: json.data
    });
  }
};

export function getTypes(){
  return async function(dispatch){
    var json = await axios.get("http://localhost:3001/types",{
      
    });
    return dispatch({
      type: GET_TYPES,
      payload: json.data
    });
  }
};

export function filterPokemonsByType(payload){
    return {
      type: FILTER_BY_TYPE,
      payload
    };
};

export function filterPokemonsByOrigin(payload){
  return {
    type: FILTER_BY_ORIGIN,
    payload
  };
};

export function sortPokemonsByOrder(payload){
  return {
    type: SORT_BY_ORDER,
    payload
  };
};