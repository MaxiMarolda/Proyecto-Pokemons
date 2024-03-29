import React from "react";
import {useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {sortPokemonsByOrder, filterPokemonsByOrigin, filterPokemonsByType, getPokemons, refresh} from "../../actions";
import Card from "../Card/Card";
import "./Home.css";
import Paginado from '../Paginado';
import SearchBar from "../SearchBar/SearchBar";



export default function Home (){
  //GLOBAL STATE CONSTANTS
  const dispatch = useDispatch();
  const dispPokemons = useSelector ((state) => state.pokemons);
  const allPokemons = useSelector ((state) => state.allPokemons);
  const types = useSelector((state) => state.types);
  //LOCAL CONSTANTS
  const pokemonsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const [render, setRender] = useState('');
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = dispPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  };

  useEffect (() => {
    dispatch(refresh())
    dispatch(getPokemons());
  },[dispatch]);

  function handleSelectType (e) {             // HERE IS THE SELECTOR BY TYPE OF POKEMON
    e.preventDefault();
    dispatch(filterPokemonsByType(e.target.value));
    setCurrentPage(1);
  };
  function handleSelectOrigin (e) {             // HERE IS THE SELECTOR BY ORIGIN OF POKEMON CREATED OR EXISTENT
    e.preventDefault();
    dispatch(filterPokemonsByOrigin(e.target.value));
    setCurrentPage(1);
  };
  
  function handleSortOrder (e) {             // HERE ARE THE SORT METHODS 
    e.preventDefault();
    dispatch(sortPokemonsByOrder(e.target.value));
    setCurrentPage(1);
    setRender(`Rendering page${e.target.value}`);
    console.log(render);
  }

  return (             // HERE IS THE HOME PAGE OF THE APP
    <div className="Home">
      <h1>Come On Pokemons</h1>
      <SearchBar setCurrentPage={setCurrentPage}/>          {/*SEARCHBAR */}
      <div className="Selects">
        <select onChange={e => handleSelectOrigin(e)}>       {/*ORIGIN SELECTOR */}
          <option value= 'all'>--Select created (All)--</option>
          <option value= 'exis'>Existent</option>
          <option value= 'created'>Created</option>
        </select>
        <select onChange={e => handleSelectType(e)}>        {/*TYPE SELECTOR */}
          <option value='all'>--Select type (All)--</option>
          {types.map((t) => {
            return(
              <option key= {t.id} value={t.name}>{t.name}</option>
              )}
            )}
        </select>
        <select onChange={e => handleSortOrder(e)}>          {/*SORT SELECTOR */}
          <option value= 'id'>--Select order (Id)--</option>
          <option value= 'asc'>Ascendent</option>
          <option value= 'dsc'>Descendent</option>
          <option value= 'hp'>Attack</option>
        </select>
      </div>
      <br/>
        <Paginado 
        pokemonsPerPage = {pokemonsPerPage}
        dispPokemons = {dispPokemons.length}
        paginado = {paginado}
        currentPage = {currentPage}
        />                                                        {/*PAGINATION */}
      <div className="Pokemons">                                  {/*POKEMON CARDS */}
          {allPokemons.length ?
            (currentPokemons.length ?
            currentPokemons.map(poke => 
              {return(
                      <Card
                        key={poke.id}
                        id={poke.id}
                        name={poke.name}
                        type={poke.type}
                        hp={poke.hp}
                        img={poke.img}
                      />)}
              )
              : <div className="NoPokemonsToShow">
                <h3>No hay Pokemons de este tipo para mostrar</h3>
                <p>Por favor cambie su elección de filtro</p>
                </div>)
            :( <h2>
              Loading...
              </h2> )}
        </div> 
    </div>

  )
}

