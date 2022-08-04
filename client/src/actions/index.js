import {GLOBAL_REFRESH, GET_POKEMONS_BY_NAME ,FILTER_BY_ORIGIN, FILTER_BY_TYPE,
   GET_POKEMONS, GET_TYPES, SORT_BY_ORDER, GET_POKEMONS_BY_ID, CLEAR_PAGE } from './actionTypes'
import axios from "axios";


export function getPokemons(){
  return (dispatch) => {
    return axios
      .get("http://localhost:3001/pokemons")
      .then((r) => dispatch({
        type: GET_POKEMONS,
        payload: r.data
        }))
      .catch((e) => e); //This is to recieve the error comming from the Back
  }
};

export function postPokemon(payload){
  return async () => {
    try {
      const response = await axios.post(`http://localhost:3001/pokemons`,payload);
      console.log(response);
      return response;
    } catch (e) {
      return e;
    }
  };
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

export function getPokemonById(id){
  return async function(dispatch){
    var json = await axios.get(`http://localhost:3001/pokemon/${id}`,{
      
    });
    return dispatch({
      type: GET_POKEMONS_BY_ID,
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

export function clearPage (){
  return {
    type: CLEAR_PAGE
  }
};

export function deletePokemon (id){
  return async () => {
    try {
      const response = await axios.delete(`http://localhost:3001/pokemon/${id}`);
      //console.log( response);
      return response;
    } catch (e) {
      return e;
    }
  };
};

export function refresh (){
  return {
    type: GLOBAL_REFRESH,
    
  }; 
};