const router = Router();

const cache = [];

router.get("/", async (req, res, next) => {
    const { name } = req.query;
  try{
    if(!name){
      if(cache.length)return res.send(cache)
      const dbpokemons = await Pokemon.findAll();
      const first20 = await axios.get("https://pokeapi.co/api/v2/pokemon");
      const last20 = await axios.get(first20.data.next);
      const pokemons = first20.data.results.concat(last20.data.results)
      const promesas =  pokemons.map(p => axios.get(p.url))
      const pokemonsMaps = await Promise.all(promesas)
      const pokemosFinish = pokemonsMaps.map(p => {
          return {
              id: p.data.id,
              name: p.data.name,
              hp: p.data.stats[0]["base_stat"],
              attack: p.data.stats[1]["base_stat"],
              defense: p.data.stats[2]["base_stat"],
              speed: p.data.stats[5]["base_stat"],
              height: p.data.height,
              weight: p.data.weight,
              image: p.data.sprites.other.home.front_default,
              types: p.data.types.map(t => t.type.name)
          }
      })
      const resultado = {};
      resultado.pokemons = pokemosFinish;
      resultado.creados = dbpokemons
      resultado.pokemons.map(obj => cache.push(obj))
      resultado.creados.map(obj => cache.push(obj))
      res.send(cache)
    }
  } catch (e){
  console.log(e)
  }
});
