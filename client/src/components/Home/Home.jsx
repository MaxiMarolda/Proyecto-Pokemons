import React from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { filterPokemonsByOrigin, filterPokemonsByType, getPokemons } from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import "./Home.css";
import Paginado from '../Paginado';


export default function Home (){

  const dispatch = useDispatch();
  const allPokemons = useSelector ((state) => state.pokemons);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
  const indexOfLastPokemon = currentPage * pokemonsPerPage
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

//  setPokemonsPerPage(12);

  useEffect (() => {
    dispatch(getPokemons());

  },[dispatch]);

  function handleOnClick (e) {
    e.preventDefault();
    dispatch(getPokemons());
  };
  function handleSelectType (e) {
    e.preventDefault();
    dispatch(filterPokemonsByType(e.target.value));
  };
  function handleSelectOrigin (e) {
    e.preventDefault();
    dispatch(filterPokemonsByOrigin(e.target.value));
  }


  return (
    <div>
      {console.log(allPokemons)}
      {console.log("allPokemons")}
      <Link to = '/pokemon'>Crear Pokemon</Link>
      <h1>Vamos los Pokemons</h1>
      <button onClick={e=> {handleOnClick(e)}}>
        Volver a cargar todos los Pokemons
      </button>
      <div className="Selects">
          <h5>Por Tipo</h5>
        <select onChange={e => handleSelectType(e)}>
          <option value= 'all'>Todos</option>
          <option value= 'normal'>Normal</option>
          <option value= 'fighting'>Fighting</option>
          <option value= 'flying'>Flying</option>
          <option value= 'poison'>Poison</option>
          <option value= 'ground'>Ground</option>
          <option value= 'rock'>Rock</option>
          <option value= 'ghost'>Ghost</option>
          <option value= 'steel'>Steel</option>
          <option value= 'fire'>Fire</option>
          <option value= 'water'>Water</option>
          <option value= 'grass'>Grass</option>
          <option value= 'electric'>Electric</option>
          <option value= 'psychic'>Psychic</option>
          <option value= 'dragon'>Dragon</option>
          <option value= 'dark'>Dark</option>
          <option value= 'fairy'>Fairy</option>
          <option value= 'unknown'>Unknown</option>
          <option value= 'shadow'>Shadow</option>
        </select>
        <h5>Por Creados</h5>
        <select onChange={e => handleSelectOrigin(e)}>
          <option value= 'all'>Todos</option>
          <option value= 'exis'>Existente</option>
          <option value= 'created'>Creado</option>
        </select>
        <p>Por tipo de orden</p>
        <select>
          <option value= 'id'>Id</option>
          <option value= 'asc'>Ascendente</option>
          <option value= 'dsc'>Descendente</option>
          <option value= 'hp'>Ataque</option>
        </select>
      </div>
      <Paginado
        pokemonsPerPage = {pokemonsPerPage}
        allPokemons = {allPokemons.length}
        paginado = {paginado}
        />
      <div className="Pokemons">
      {currentPokemons.length ?
          currentPokemons.map((poke => 
            {console.log(poke.types.toString())
              return(
                    <Card
                      key={poke.id}
                      //<Link className="PokeCard" to={`/pokemons/${poke.id}`}>
                        name={poke.name}
                      //</Link>
                      types={poke.types.toString()}
                      img={poke.img}
                    />)}
            ))
        : <div className="NoPokemonsToShow">
          <h3>No hay Pokemons de este tipo para mostrar</h3>
          <p>Por favor cambie su elección de filtro</p>
          </div>}
      </div> 
    </div>

  )
}

