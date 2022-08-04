import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { postPokemon, getTypes, refresh, getPokemons } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import './PokemonCreate.css'

const regexs = {
    name: /^[a-z0-9-]{5,10}$/,  // acepta cualquier letra de a hasta z y 0 a 10 case sensitive entre 4 y 10 dígitos
    powers: /^[0-9]{1,3}$/,   // el^ del inicio quiere decir que lo busca al principio
    img: /^http(|s):.*\..*\.(jpg|png|jpeg|gif)$/, // el $ al final significa que no acepta nada despues
  } 
  
export function validate(data) {     
  let errors = {};
  if (!regexs.name.test(data.name)) {
    errors.name = 'Name is invalid, it must have 5 to 10 characters';
  }
  if (!regexs.powers.test(data.hp) || data.hp > 140) {
    errors.hp = 'Attack is invalid, it must be between 0-140';
  }
  if (!regexs.powers.test(data.strength) || data.strength > 100) {
    errors.strength = 'strength is invalid, it must be between 0-100';
  }
  if (!regexs.powers.test(data.defense) || data.defense > 100) {
    errors.defense = 'defense is invalid, it must be between 0-100';
  }
  if (!regexs.powers.test(data.speed) || data.speed > 100) {
    errors.speed = 'speed is invalid, it must be between 0-100';
  }
  if (!regexs.powers.test(data.height) || data.height > 100) {
    errors.height = 'height is invalid, it must be between 0-100';
  }
  if (!regexs.powers.test(data.weight) || data.weight > 100) {
    errors.weight = 'weight is invalid, it must be between 0-100';
  }
  if (!regexs.img.test(data.img)) {
    errors.img = 'img must be a valid URL';
  }
  return errors;
};

export default function PokemonCreate() {
  const dispatch = useDispatch();
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
  
  useEffect(() => {              //  INITIAL HOOK //
    dispatch(getTypes())
  }, [dispatch]);

  function handleChange(e) {    //FORM VALIDATION/REGISTRATION
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
    setErrors(validate({
      ...data,
      [e.target.name]: e.target.value}
      ));
  };

  function handleType(e) {        //TYPE SELECTION 
    e.preventDefault();
        setData({
              ...data,
              type: [...data.type, e.target.value]
            })
  };

  function handleDelete(e) {    //TYPE CORRECTION OPTION
    setData({
      ...data,
      type: data.type.filter(t => t !== e)
    });
    console.log(data.type);
  };

  function handleOnSubmit(e) { // FORM SUBMIT ACTION
    e.preventDefault();
    if(Object.keys(validate(data)).length > 0) {
      alert ("There are missing or wrong data in the form")
      return
    } else {
      dispatch(postPokemon(data))
        .then(r => {
          r.data ? alert(r.data) 
            : alert(r.response.data)
        });
      setData(initialPokemonState);
      dispatch(getPokemons())
     // window.location.reload();
    }
  };
                                      /* FORM */
  return (
    <div className="CreateForm">
        <h2>Lets create our own Pokemon</h2>
      <div className="FormatForm">
        <div></div>
        <form onSubmit={handleOnSubmit}>
          <label>Name: </label>
          <input className={errors.name && "danger"} 
            type="text" 
            name="name" 
            onChange={e => handleChange(e)} 
            value={data.name}
            required />
           <br />
          <label>Attack:     </label>
          <input className={errors.hp && "danger"}
            type="number" 
            name="hp" 
            onChange={e => handleChange(e)} 
            value={data.hp} 
            required />
          <br />
          <label >Stregth:   </label>
          <input className={errors.strength && "danger"}
            type="number" 
            name="strength" 
            onChange={e => handleChange(e)} 
            value={data.strength} 
            required /> 
          <br />
          <label >Defense:    </label>
          <input className={errors.defense && "danger"}
            type="number" 
            name="defense" 
            onChange={e => handleChange(e)} 
            value={data.defense} 
            required /> 
          <br />
          <label >Speed:   </label>
          <input className={errors.speed && "danger"}
            type="number" 
            name="speed" 
            onChange={e => handleChange(e)} 
            value={data.speed} 
            required /> 
          <br />
          <label >Height:  </label>
          <input className={errors.height && "danger"}
            type="number" 
            name="height" 
            onChange={e => handleChange(e)}
            value={data.height} 
            required />
          <br />
          <label >Weight:  </label>
          <input className={errors.weight && "danger"}
            type="number" 
            name="weight" 
            onChange={e => handleChange(e)} 
            value={data.weight} 
            required />
          <br />
          <label >Image:  </label>
          <input className={errors.img && "danger"}
            type="text" 
            name="img" 
            onChange={e => handleChange(e)} 
            value={data.img} /> 
          <br />            {/* TYPE SELECTION MENU */}
          <label >Type:                 </label>
          <select onChange={e => handleType(e)}>
            <optgroup label="--Select 2 types--">
              <option value="" disabled selected></option>
                {data.type.length === 2 ? 
                    <option >No more types</option>
                  :types.map((t) => {
                    return (
                      <option key={t.id} value={t.name}>{t.name}</option>
                    )
                  })
                }
            </optgroup >
          </select>
          <br />                  {/* DELETE BUTTON */}
         {data.type.map((t) => {
            return (
                <button key={t} onClick={() => handleDelete(t)}>Erase Type: {t}</button>
                )
          }
          )}
          <br/> <br/>            {/* CREATE BUTTON */}
          <button className="CreateButton" type="submit">Create</button>
        </form>
        <div className="divDanger">    {/* VALIDATION ERRORS */}
          <span>  {errors.name && (<span className="danger">{errors.name}</span>)}</span>
          <br/>
          <span>  {errors.hp && (<span className="danger">{errors.hp}</span>)}</span>
          <br/>
          <span>  {errors.strength && (<span className="danger">{errors.strength}</span>)}</span>
          <br/>
          <span>  {errors.defense && (<span className="danger">{errors.defense}</span>)}</span>
          <br/>
          <span>  {errors.speed && (<span className="danger">{errors.speed}</span>)}</span>
          <br/>
          <span>  {errors.height && (<span className="danger">{errors.height}</span>)}</span>
          <br/>
          <span>  {errors.weight && (<span className="danger">{errors.weight}</span>)}</span>
          <br/>
          <span>  {errors.img && (<span className="danger">{errors.img}</span>)}</span>
          <br/>
        </div>
      </div>
      
        <br />
        <br/>
      <Link to='/home'>
        <button>Back to Home</button>
      </Link>
    </div>
  )
}