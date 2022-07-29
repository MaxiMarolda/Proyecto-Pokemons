import React from "react";
import {useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {sortPokemonsByOrder, filterPokemonsByOrigin, filterPokemonsByType, getPokemons} from "../../actions";
//import {Link } from "react-router-dom";
import Card from "../Card/Card";
import "./Home.css";
import Paginado from '../Paginado';
import SearchBar from "../SearchBar";



export default function Home (){

  const dispatch = useDispatch();
  const allPokemons = useSelector ((state) => state.pokemons);
  const types = useSelector((state) => state.types)
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line
  const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
  const [render, setRender] = useState('');
  const indexOfLastPokemon = currentPage * pokemonsPerPage
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect (() => {
    dispatch(getPokemons());
  },[dispatch]);

  // function handleOnClick (e) {
  //   e.preventDefault();
  //   dispatch(getPokemons());
  // };
  function handleSelectType (e) {
    e.preventDefault();
    dispatch(filterPokemonsByType(e.target.value));
    setCurrentPage(1);
  };
  function handleSelectOrigin (e) {
    e.preventDefault();
    dispatch(filterPokemonsByOrigin(e.target.value));
    setCurrentPage(1);
  }
  
  function handleSortOrder (e) {
    e.preventDefault();
    dispatch(sortPokemonsByOrder(e.target.value));
    setCurrentPage(1);
    setRender(`Lo ejecuto para renderizar${e.target.value}`);
    console.log(render);
  }

  return (
    <div className="Home">
      <h1>Come On Pokemons</h1>
      <SearchBar setCurrentPage={setCurrentPage}/>
      <div className="Selects">
        <select onChange={e => handleSelectType(e)}>
          <option value='all'>--Select type (All)--</option>
          {types.map((t) => {
            return(
              <option key= {t.id} value={t.name}>{t.name}</option>
              )}
            )}
        </select>
        <select onChange={e => handleSelectOrigin(e)}>
          <option value= 'all'>--Select created (All)--</option>
          <option value= 'exis'>Existente</option>
          <option value= 'created'>Creado</option>
        </select>
        <select onChange={e => handleSortOrder(e)}>
          <option value= 'id'>--Select order (Id)--</option>
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
          currentPokemons.map(poke => 
            {//console.log(poke.type)
              //console.log(poke.id)
              return(
                    <Card
                      key={poke.id}
                      //<Link className="PokeCard" to={`/pokemons/${poke.id}`}>
                        name={poke.name}
                      //</Link>
                      type={poke.type}
                      hp={poke.hp}
                      img={poke.img}
                    />)}
            )
        : <div className="NoPokemonsToShow">
          <h3>No hay Pokemons de este tipo para mostrar</h3>
          <p>Por favor cambie su elección de filtro</p>
          </div>}
      </div> 
    </div>

  )
}

