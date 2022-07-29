import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { postPokemon, getTypes } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import './PokemonCreate.css'

  const regexName = /^[a-z]{4,10}$/;
  
export function validate(data) {
  let errors = {};
  if (!data.name) {
    errors.name = 'A name is required';
  } else if (!regexName.test(data.name)) {
    errors.name = 'Name is invalid';
  }
  // if (!input.password) {
  //     errors.password = 'Password is required';
  //   } else if (!/(?=.*[0-9])/.test(input.password)) {
  //     errors.password = 'Password is invalid';
  //   }

  return errors;
};




export default function PokemonCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.types);
  const allPokemons = useSelector((state) => state.allPokemons);
  const picId = allPokemons.length + 800;
  const picURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${picId}.png`;
  const initialPokemonState = {
    name: "",
    hp: "",
    strength: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    img: picURL,
    type: []
  };
  const [data, setData] = useState(initialPokemonState);
  const [errors, setErrors] = useState({})
  
  useEffect(() => {
    dispatch(getTypes())
  }, [dispatch]);

  function handleChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
    // console.log(data);
    // console.log(data.type);
    // console.log(picId);
    setErrors(validate({
      ...data,
      [e.target.name]: e.target.value}
      ));
  };

  function handleType(e) {
    e.preventDefault();
    setData({
      ...data,
      type: [...data.type, e.target.value]
    });
   // console.log(data.type);
  };

  function handleDelete(e) {
    //e.preventDefault();
    setData({
      ...data,
      type: data.type.filter(t => t !== e)
    });
    console.log(data.type);
  };

  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(postPokemon(data))
      .then(r => {
        r.data ? alert(r.data) 
          : alert(r.response.data)
      });

    setData(initialPokemonState);
    history.push('/home')
  };

  return (
    <div className="CreateForm">
      <h2>Lets create our own Pokemon</h2>
      <form onSubmit={handleOnSubmit}>
        <label>Name: </label>
         <input className={errors.name && "danger"} 
          type="text" 
          name="name" 
          onChange={e => handleChange(e)} 
          value={data.name}
          required />
        {errors.name && (<span className="danger">{errors.name}</span>)}
        <br />
        <label>Attack:    <input type="number" name="hp" onChange={e => handleChange(e)} value={data.hp} required /> </label>
        <br />
        <label >Stregth:   <input type="number" name="strength" onChange={e => handleChange(e)} value={data.strength} required /> </label>
        <br />
        <label >Defense:    <input type="number" name="defense" onChange={e => handleChange(e)} value={data.defense} required /> </label>
        <br />
        <label >Speed:   <input type="number" name="speed" onChange={e => handleChange(e)} value={data.speed} required /> </label>
        <br />
        <label >Height:  <input type="number" name="height" onChange={e => handleChange(e)} value={data.height} required /> </label>
        <br />
        <label >Weight:  <input type="number" name="weight" onChange={e => handleChange(e)} value={data.weight} required /> </label>
        <br />
        <label >Image:  <input type="text" name="img" onChange={e => handleChange(e)} value={data.img} /> </label>
        <br />
        <select onChange={e => handleType(e)}>
          <option>--Select types--</option>
          {types.map((t) => {
            return (
             // {if(this.data.type.length < 2) {
              <option key={t.id} value={t.name}>{t.name}</option>
            //}}
            )
          }
          )}
        </select>
        <br />
        <button className="CreateButton" type="submit">Create</button>
      </form>
      {data.type.map((t) => {
            return (
              <div>
                <p>{t}</p>
                <button onClick={() => handleDelete(t)}>Erase Type Selected</button>
              </div>
            )
          }
        )}
        <br />
      <br />
      <div className="DataTypes">
      </div>
      <Link to='/home'>
        <button>Back to Home</button>
      </Link>
    </div>
  )
}