import { useForm } from "../../hooks/useForm";
import Loader from "../Loader";
import Message from "../Message";
import "../../componentsCSS/createPokemon.css"
import { Link } from "react-router-dom";
//Url's validas para crear pokemones
// https://assets.pokemon.com/assets/cms2/img/pokedex/full/150.png
// https://assets.pokemon.com/assets/cms2/img/pokedex/full/063.png
// https://assets.pokemon.com/assets/cms2/img/pokedex/full/143.png



const initialForm = {
  name: "",
  hp: "",
  strength: "",
  defense: "",
  height: "",
  speed: "",
  weight: "",
  type: "",
  img : ""
};

const validationsForm = (form) => {
  let errors = {};
  let regexName = /^[a-z]{4,10}$/;
  let regexUrl = /^(https?:\/\/.*\.(?:png|jpg))/i;
  let regexStats = /^[0-9_-]{1,2}$/;

  if (!regexName.test(form.name)) {
    errors.name = "El nombre debe tener entre 4 y 10 caracteres";
  }
  if (!regexUrl.test(form.img)) {
    errors.img = "La url debe ser una imagen";
  }
  if (!regexStats.test(form.hp)) {
    errors.hp = "El hp debe tener entre 1 y 2 digitos";
  }
  if (!regexStats.test(form.strength)) {
    errors.strength = "La fuerza debe tener entre 1 y 2 digitos";
  }else if(form.strength > 100){
    errors.strength = "La fuerza debe ser menor a 100";
  }else if(form.strength < 100){
    errors.strength = "La fuerza debe ser mayor a 100";
  }
  if (!regexStats.test(form.defense)) {
    errors.defense = "La defensa debe tener entre 1 y 2 digitos";
  }
  if (!regexStats.test(form.height)) {
    errors.height = "La altura debe tener entre 1 y 2 digitos";
  }
  if (!regexStats.test(form.speed)) {
    errors.speed = "La velocidad debe tener entre 1 y 2 digitos";
  }
  if (!regexStats.test(form.weight)) {
    errors.weight = "El peso debe tener entre 1 y 2 digitos";
  }
  return errors;
}

 



const CreatePokemon = () => {
  const {
    form,
    errors,
    loading,
    response,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useForm(initialForm, validationsForm);

  return (
    <div className="form">
      {/* vamos hacer una ruta para ir al home */}
     
      <h1>Crear</h1>
      <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="input-stats">
        <input
          type="text"
          name="name"
          placeholder="Nombre Pokemon..."
          onBlur={handleBlur}
          onChange={handleChange}
          value={form.name}
          required
        />
        {errors.name && <p className="pp" >{errors.name}</p>}
        </div>
        <div className="input-stats">
        <input
          type="text"
          name="hp"
          placeholder="Escribe tu cv..."
          onBlur={handleBlur}
          onChange={handleChange}
          value={form.hp}
          required
        />
        {errors.hp && <p className="pp" >{errors.hp}</p>}
        </div>
        <div className="input-stats">
        <input
          type="text"
          name="strength"
          placeholder="Fuerza ..."
          onBlur={handleBlur}
          onChange={handleChange}
          value={form.strength}
          required
        />
        {errors.strength && <p  className="pp" >{errors.strength}</p>}
        </div>
        <div className="input-stats">
        <input
          type="text"
          name="defense"
          placeholder="Defensa..."
          onBlur={handleBlur}
          onChange={handleChange}
          value={form.defense}
          required
        />
        {errors.defense && <p className="pp" >{errors.defense}</p>}
        </div>
        <div className="input-stats">
        <input
          type="text"
          name="height"
          placeholder="Altura..."
          onBlur={handleBlur}
          onChange={handleChange}
          value={form.height}
          required
        />
        {errors.height && <p className="pp" >{errors.height}</p>}
        </div>
        <div className="input-stats">
        <input
          type="text"
          name="speed"
          placeholder="Velocidad..."
          onBlur={handleBlur}
          onChange={handleChange}
          value={form.speed}
          required
        />
        {errors.speed && <p className="pp" >{errors.speed}</p>}
        </div>
        <div className="input-stats">
        <input
          type="text"
          name="weight"
          placeholder="Peso..."
          onBlur={handleBlur}
          onChange={handleChange}
          value={form.weight}
          required
        />
        {errors.weight && <p className="pp" >{errors.weight}</p>}
        </div>
        <div className="input-stats">
        <input
          type="text"
          name="img"
          placeholder="Imagen..."
          onBlur={handleBlur}
          onChange={handleChange}
          value={form.img}
          required
        />
        {errors.img && <p className="pp" >{errors.img}</p>}
        </div>
        <div className="select dd" >
                    <select name="type" onChange={handleChange} >
                      <option value="rock">Rock</option>
                      <option value="bug">Bug</option>
                      <option value="ghost">Ghost</option>
                      <option value="steel">Steel</option>
                      <option value="normal">Normal</option>
                      <option value="fighting">Fighting</option>
                      <option value="fire">Fire</option>
                      <option value="flying">Flying</option>
                      <option value="poison">Poison</option>
                      <option value="ground">Ground</option>
                      <option value="water">Water</option>
                      <option value="grass">Grass</option>
                      <option value="electric">Electric</option>
                      <option value="shadow">Shadow</option>
                      <option value="dragon">Dragon</option>
                      <option value="dark">Dark</option>
                      <option value="fairy">Fairy</option>
                      <option value="unknown">Unknown</option>
                      <option value="physic">Psychic</option>
                      <option value="ice">Ice</option>
                    </select>
            </div>
         {/* aca creamos el boton para enviar los datos del pokemon creado y que se guarden en la base de datos */}

        <button type="submit" className="enviar2"> Crear </button>
        {/* <input className="enviar2" type="submit" value="Listo" /> */}
      </form>
      {loading && <Loader />}
      {response && (
        <Message msg="The pokemon has been created successfully" bgColor="#198754" />
      )}
       <Link to="/Home"><button className="btn2-create">Home</button></Link>
      </div>
    </div>
  );
};

export default CreatePokemon;