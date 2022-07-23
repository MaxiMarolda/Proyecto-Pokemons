const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
//const Tipo = require('../models/Tipo');
const {Pokemon ,Tipo} = require('../db');


const router = Router();
let cache = [];

var offset = 0;
var limit = 5;

const getPokemons = async () =>{
  console.log(`pedido a la api desde ${offset} cantidad ${limit}`);
  const apiUrl = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  //console.log(apiUrl.data);
  const apiInfo = await Promise.all(apiUrl.data.results.map(e => axios.get(e.url)));
  const apiInfoFinal = apiInfo.map(el => {
    return {
      id: el.data.id,
      nombre: el.data.name,
      tipos: el.data.types.map(t => t.type.name),
      img: el.data.sprites.other.home.front_default,
      vida: el.data.stats[0].base_stat,
      ataque: el.data.stats[1].base_stat,
      defensa: el.data.stats[2].base_stat,
      velocidad: el.data.stats[5].base_stat,
      altura: el.data.height,
      peso: el.data.weight,
    };
  });
  return apiInfoFinal;
};

const getDbInfo = async () => {
  return await Pokemon.findAll({
    include: {
      model: Tipo,
      attributes: ['nombre'],
      through: {
        attributes: [],
      }
    },
    attributes: ["id","nombre","img","vida","ataque","defensa","velocidad","altura","peso"]
  });
};


const getAllPokemons = async () => {
  let apiInfo2 = [];
  let apiInfo3 = [];
  if(cache.length > 39){
   console.log(`De la cache ${cache}`);
    apiInfo2 = cache;
  } else {
    console.log("consulto la webApi");
    do {
      apiInfo3 = (await getPokemons());
      apiInfo2 = apiInfo2.concat(apiInfo3);
      offset += limit;
      console.log(`ApiInfo 2 ${apiInfo2}`);
    } while (offset < 39);
  }
  const dbInfo = await getDbInfo();
  console.log("consulto la DB");
  const infoTotal = apiInfo2.concat(dbInfo);
  infoTotal.map (el => cache.push(el));
  console.log(`Desde la web ${cache}`);
  return infoTotal;
};



router.get ('/pokemons', async (req, res) => {
  const { name } = req.query;
  //console.log(`Console de nombre: ${name}`);
  if (!name) {
    console.log("entre al if");
    let pokemonsTotal = await getAllPokemons();
    try {
    return res.send(pokemonsTotal)
  } catch (error) {
    return res.status(400).send("Error en la consulta");
  }
  } else {
    try {
      let pokemonName = await cache.filter( e => e.nombre.toLowerCase() === name.toLowerCase());
      return pokemonName.length ?
            res.json(pokemonName) :
            res.status(404).send('No existe ese personaje')    
    } catch (error) {
      console.log(error);
      return res.status(400).send("Error en la consulta");
    }
    

  }
//  console.log("Entré ");
  
});


router.get ('/pokemons/:ID', async (req, res) => {
  const { ID } = req.params;
  const getPokemon = async () => {
    if(ID.length < 4){
        const apiInfo = await axios.get(`https://pokeapi.co/api/v2/pokemon/${ID}`);
      const apiInfoFinal = {
        id: apiInfo.data.id,
        nombre: apiInfo.data.name,
        tipos: apiInfo.data.types.map(t => t.type.name),
        img: apiInfo.data.sprites.other.home.front_default,
        vida: apiInfo.data.stats[0].base_stat,
        ataque: apiInfo.data.stats[1].base_stat,
        defensa: apiInfo.data.stats[2].base_stat,
        velocidad: apiInfo.data.stats[5].base_stat,
        altura: apiInfo.data.height,
        peso: apiInfo.data.weight,
      };
      return apiInfoFinal;
    } else {
      return await Pokemon.findOne({
        where: {id : ID},
        include: {
          model: Tipo,
          attributes: ['nombre'],
          through: {
            attributes: [],
          }
        },
        attributes: ["id","nombre","img","vida","ataque","defensa","velocidad","altura","peso"]
       });
    };
  } 

  let pokemon = await getPokemon();

  try {
    return res.send(pokemon)
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error en la consulta");
  }
});


router.get ('/types', async (req, res) => {
  try {
    const typesApi = await axios.get ('https://pokeapi.co/api/v2/type');
    const types = typesApi.data.results.map (el => el.name);
    types.forEach (el => {
      Tipo.findOrCreate({
        where: {nombre: el}
      });
    });
    const allTypes = await Tipo.findAll();
    res.send(allTypes);
  } catch (error) {
    res.send(error);
  } 
});

router.post ('/pokemons', async (req, res) => {
  const {nombre, vida, ataque, defensa, velocidad, altura, peso, tipo} = req.body;
  if (!nombre) {
    return res.status(404).send("El Pokemon DEBE tener un nombre");
  } else{
    console.log(nombre);
    try {
      let pokemonCreated = await Pokemon.create({
        nombre,
        vida,
        ataque,
        defensa,
        velocidad,
        altura,
        peso,
      });
      let typeOnDb = await Tipo.findAll({
        where: {nombre : tipo}
      });
      pokemonCreated.addTipo(typeOnDb);
      res.send('Pokemon creado Exitosamente');

    } catch (error) {
      return res.status(400).send(error);
    }
  }
});


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
