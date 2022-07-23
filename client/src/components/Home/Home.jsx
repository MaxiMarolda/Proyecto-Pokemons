import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getPokemons } from "../../actions";
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
  const indexOfFirstPokemon = indexOfLastPokemon -pokemonsPerPage;
  const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

 const paginado = (pageNumber) => {
  setCurrentPage(pageNumber)
 }

  useEffect (() => {
    dispatch(getPokemons());

  },[dispatch]);

  function handleOnClick (e) {
    e.preventDefault();
    dispatch(getPokemons());
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
      <div>
        <select>
          <option value= 'todo'>Todos</option>
          <option value= 'tipo'>Tipo</option>
          <option value= 'exis'>Existente</option>
          <option value= 'crea'>Creado</option>
        </select>
        <select>
          <option value= 'asc'>Ascendente</option>
          <option value= 'dsc'>Descendente</option>
          <option value= 'ata'>Ataque</option>
        </select>
      </div>
      <Paginado
        pokemonsPerPage = {pokemonsPerPage}
        allPokemons = {allPokemons.length}
        paginado = {paginado}
        />
      <div className="Pokemons">
        {currentPokemons?.map(poke => 
          {console.log(poke.tipos.toString())
            return(
          <Card
            key={poke.id}
            nombre={poke.nombre}
            //tipos={poke.tipos.map(t=> t)}
            img={poke.img}
          />)}
          )}
      </div> 
    
        {/* {allPokemons?.map(e => {
            return (
              <fragment className='Cards'>
                <Link to={"/home" + e.id}>
                  <Card nombre={e.nombre} tipo={e.tipos} img={e.img} key={e.id}/>
                </Link>
              </fragment>
          );
        })} */}
    </div>
  )
}

