import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import { postPokemon, getTypes } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import './PokemonCreate.css'


export default function PokemonCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.types);
  const initialPokemonState = {
    name: "",
    hp: "",
    strength: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    img: "",
    type: []
  };
  const [data, setData] = useState(initialPokemonState);

  useEffect(() => {
    dispatch(getTypes())
  }, [dispatch]);

  function handleChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
    console.log(data)
  };

  function handleType(e) {
    e.preventDefault();
    setData({
      ...data,
      type: [...data.type, e.target.value]
    });
  };

  function handleOnSubmit(e) {
    e.preventDefault();
    dispatch(postPokemon(data));
    console.log(types);
    console.log(data);
    setData(initialPokemonState);
    alert(`Pokemon ${data.name} creado con exito`)
    history.push('/home')
  };

  return (
    <div className="CreateForm">
      <h2>Lets create our own Pokemon</h2>
      <form onSubmit={handleOnSubmit}>
        <label >Name <input type="text" name="name" onChange={e => handleChange(e)} value={data.name} /> </label>
        <br />
        <label >Attack <input type="number" name="hp" onChange={e => handleChange(e)} value={data.hp} /> </label>
        <br />
        <label >Stregth <input type="number" name="strength" onChange={e => handleChange(e)} value={data.strength} /> </label>
        <br />
        <label >Defense <input type="number" name="defense" onChange={e => handleChange(e)} value={data.defense} /> </label>
        <br />
        <label >Speed <input type="number" name="speed" onChange={e => handleChange(e)} value={data.speed} /> </label>
        <br />
        <label >Height <input type="number" name="height" onChange={e => handleChange(e)} value={data.height} /> </label>
        <br />
        <label >Weight <input type="number" name="weight" onChange={e => handleChange(e)} value={data.weight} /> </label>
        <br />
        <label >Image <input type="text" name="img" onChange={e => handleChange(e)} value={data.img} /> </label>
        <br />
        <select onChange={e => handleType(e)}>
          <option selected disabled>Select types</option>
          {types.map((t) => {
            return (
              <option key={t.id} value={t.name}>{t.name}</option>
            )
          }
          )}
        </select>
        <br />
        <br />
        <button className="CreateButton" type="submit">Create</button>
      </form>
      <br />
      <div className="DataTypes">
        <p>Type 1: {data.type[0]}</p>
        <button>X</button>
        <p>Type 2: {data.type[1]}</p>
        <button>X</button>
      </div>
      <Link to='/home'>
        <button>Back to Home</button>
      </Link>
    </div>
  )
}