const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const {Pokemon ,Type} = require('../db');


const router = Router();
let cache = [];

var offset = 0;
var limit = 20;

const getPokemons = async () =>{
  console.log(`pedido a la api desde ${offset} cantidad ${limit}`);
  const apiUrl = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  //console.log(apiUrl.data);
  const apiInfo = await Promise.all(apiUrl.data.results.map(e => axios.get(e.url)));
  const apiInfoFinal = apiInfo.map(el => {
    return {
      id: el.data.id,
      name: el.data.name,
      type: el.data.types.map(t => t.type.name),
      img: el.data.sprites.other.home.front_default,
      hp: el.data.stats[0].base_stat,
      strength: el.data.stats[1].base_stat,
      defense: el.data.stats[2].base_stat,
      speed: el.data.stats[5].base_stat,
      height: el.data.height,
      weight: el.data.weight,
      created: false,
    };
  });
  return apiInfoFinal;
};

const getDbInfo = async () => {
  try {
    let pokes =  await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: []
        },
      },
    });
    pokes = pokes.map((e) => ({...e.dataValues, type: e.types.map((e) => e.name)}))
    for (let i = 0; i < pokes.length; i++) {
      delete pokes[i].types;
    }
    //console.log(pokes);
    return pokes;
  } catch (e) {
    console.log(e)
  } 
};


const getAllPokemons = async () => {
  let apiInfo2 = [];
  let apiInfo3 = [];
  console.log(cache.length)
  if(cache.length > 39){
   //console.log(`De la cache ${cache}`);
    return cache; 
  } else {
    //console.log("consulto la webApi");
    while (offset < 39){
      apiInfo3 = (await getPokemons());
      apiInfo2 = apiInfo2.concat(apiInfo3);
      offset += limit;
      //console.log(`ApiInfo 2 ${apiInfo2}`);
    };
    const dbInfo = await getDbInfo();
       //console.log("consulto la DB");
    const infoTotal = apiInfo2.concat(dbInfo);
    infoTotal.map (el => cache.push(el));
        //console.log(`Desde la web ${cache}`);
    return infoTotal;
  }
};

router.get ('/pokemons', async (req, res) => {
  let { name } = req.query;
  if (!name) {
    //console.log(`Console de nombre: ${name}`);
      try {
      let pokemonsTotal = await getAllPokemons();//getDbInfo()
      return res.send(pokemonsTotal)
    } catch (error) {
      console.log(error)
      return res.status(400).send("Error in the query");
    }
  } else {
    name = name.toLowerCase();
    try {
      let pokemonName = await cache.filter( e => e.name === name);
      return pokemonName.length ?
            res.json(pokemonName) :
            res.status(404).send("The Pokemon does not exists")    
    } catch (error) {
      console.log(error);
      return res.status(400).send("Error in the query");
    }
    

  }
//  console.log("Entré ");
  
});

router.get ('/db', async (req, res) => {
  let { name } = req.query;
 // console.log(`Console de nombre: ${name}`);
  if (!name) {
    //console.log("entre al if");
    try {
      let pokemonsTotal = await getDbInfo();
      return res.send(pokemonsTotal)
    } catch (error) {
      console.log(error)
      return res.status(400).send("Error in the query");
    }
  } else {
    name = name.toLowerCase();
    try {
      let pokemonName = await cache.filter( e => e.name === name);
      return pokemonName.length ?
            res.json(pokemonName) :
            res.status(404).send("The Pokemon does not exists")    
    } catch (error) {
      console.log(error);
      return res.status(400).send("Error in the query");
    }
    

  }
});

router.get ('/pokemons/:ID', async (req, res) => {
  const { ID } = req.params;
  const getPokemon = async () => {
    if(ID.length < 4){
        const apiInfo = await axios.get(`https://pokeapi.co/api/v2/pokemon/${ID}`);
      const apiInfoFinal = {
        id: apiInfo.data.id,
        name: apiInfo.data.name,
        type: apiInfo.data.types.map(t => t.type.name),
        img: apiInfo.data.sprites.other.home.front_default,
        hp: apiInfo.data.stats[0].base_stat,
        strength: apiInfo.data.stats[1].base_stat,
        defense: apiInfo.data.stats[2].base_stat,
        speed: apiInfo.data.stats[5].base_stat,
        height: apiInfo.data.height,
        weight: apiInfo.data.weight,
      };
      return apiInfoFinal;
    } else {
      let pokes =  await Pokemon.findOne({
        where: {id : ID},
        include: {
          model: Type,
          attributes: ['name'],
          through: {
            attributes: [],
          }
        }
       });
        pokes = pokes.dataValues;
        pokes.type = pokes.types.map((e) => e.name)
        delete pokes.types;
      console.log(pokes.type)
      return pokes;
    } 
  }

  try {
    return res.send(await getPokemon())
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error en la consulta");
  }
});

router.get ('/types', async (req, res) => {
  try {
    const typesApi = await axios.get ('https://pokeapi.co/api/v2/type');
    const types = typesApi.data.results.map (el => el.name);
    types.forEach (type => {
      Type.findOrCreate({
        where: {name: type},
      });
    });
    const allTypes = await Type.findAll();
    res.send(allTypes);
  } catch (error) {
    res.send(error);
  } 
});

router.post ('/pokemons', async (req, res) => {
  const {name, hp, strength, defense, speed, height, weight, type, img} = req.body;
    try {
      if (name && typeof name === "string") {
        if (hp > 0 && hp < 141 && 
          strength > 0 && strength < 101 && 
          defense > 0 && defense < 101 &&
          speed > 0 && speed < 101 &&
          height > 0 && height < 101 &&
          weight > 0 && weight < 101
        ) {
            let pokemonCreated = await Pokemon.create({
              name: name.toLowerCase(),
              hp,
              strength,
              defense,
              speed,
              height,
              weight,
              img,
            });
            let typeOnDb = await Type.findAll({
              where: {name : type}
            });
            if (!typeOnDb[0]) return res.status(404).send("The Pokemon must have a valid Type"); 
            pokemonCreated.addType(typeOnDb);
            cache = [];           //Drain the Cache memory
            offset = 0;           //Set Offset in 0 to force a new API search
            getAllPokemons()      //Re build the new Cache includding the new added pokemon
            return res.status(200).send('Pokemon was created');
          } else {
            return res.status(404).send("The Pokemon MUST have all valid para meters");
          }
      } else {
        return res.status(404).send("The Pokemon MUST have a name");
      }
    }catch (error) {
      console.log(error);
      return res.status(400).send("The Pokemon allready exists, please try with another name");
    } 
  }
); 

router.delete ('/pokemon/:ID', async (req, res) => {
  const { ID } = req.params;
  console.log(ID);
  try {
    let deletePokemon = await Pokemon.destroy({
      where: {id : ID}
    })
    cache = [];           //Drain the Cache memory
    offset = 0;           //Set Offset in 0 to force a new API search
    getAllPokemons()      //Re build the new Cache excludding the recently destroyed pokemon
    return deletePokemon === 0
     ? res.status(404).send("something went wrong, Pokemon was not deleted")
     :res.status(200).send(`The Pokemon was Destroyed!!!`)
  } catch (error) {
    return res.status(500).send("something went wrong, internal server error")
  }
})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
