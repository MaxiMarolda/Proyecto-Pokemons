import React from "react";
import { useSelector, useDispatch} from "react-redux";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getPokemonsById , clearPage, deletePokemon, refresh, getPokemons} from "../../actions";
import { Link } from 'react-router-dom';
import './Details.css';

export default function PokemonDetails(){
  const {id} = useParams();
  const dispatch = useDispatch();
  const pokeDetail = useSelector (state => state.pokemonDetail);
  const [destroyed, setDestroyed] = useState(false);
 
 
  useEffect (() => {
    dispatch(getPokemonsById(id))//on Mount
    return ()=>{
      dispatch(clearPage());//on Unmount
      dispatch(refresh());
    };
  },[dispatch,id]);

  function handleOnClick (e) {    // FORM SUBMIT ACTION
    dispatch(deletePokemon(e))
      .then (r => {
        r.data ? alert(r.data) 
          : alert(r.response.data)
      });
      setDestroyed(true);
      dispatch(refresh())
      dispatch(getPokemons())
  };
 
 //console.log(pokeDetail);
  return (
    <>
          {pokeDetail.name ?
            <>
              <div className="Details">
                <h3>Name: {pokeDetail.name.toUpperCase()}</h3>
                <h5>id: {id}</h5>
                <h5>Attack: {pokeDetail.hp}</h5>
                <h5>strength: {pokeDetail.strength}</h5>
                <h5>defense: {pokeDetail.defense}</h5>
                <h5>speed: {pokeDetail.speed}</h5>
                <h5>height: {pokeDetail.height}</h5>
                <h5>weight: {pokeDetail.weight}</h5>
                <h5>Types: {pokeDetail.type.length === 0
                  ? ("No type available")
                  :pokeDetail.type.length === 1 
                    ? pokeDetail.type[0]
                    :(pokeDetail.type[0] + " - " + pokeDetail.type[1])}
                </h5>
                <div className="">
                  {pokeDetail.created  && !destroyed ? 
                      <button className="DestroyButton" onClick={e=> {handleOnClick(id)}}>Destroy</button>
                      : pokeDetail.created  && destroyed ?
                      <h3 className="DestroyMessage">Pokemon Destroyed</h3>
                      :<br/> 
                  }
                </div>
                <img src={pokeDetail.img} alt={pokeDetail.name} />
              </div>
              <br/>
              <Link to='/home'>
                <button>Back to Home</button>
              </Link>

              
            </>
            : (
              <Link to='/home'>
              <h2>
              Loading...
                  <button>Back to Home</button>
              </h2> 
              </Link>)
          }
        </>
    )
  
}
