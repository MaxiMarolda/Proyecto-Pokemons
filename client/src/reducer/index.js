import { POST_POKEMON, GET_POKEMONS_BY_NAME, FILTER_BY_ORIGIN, FILTER_BY_TYPE, GET_POKEMONS, GET_TYPES, SORT_BY_ORDER } from '../actions/actionTypes'
const initialState = {
  pokemons : [],
  allPokemons : [],
  types: [],
}

function reducer (state= initialState, {type, payload}){
  const allPokemons = state.allPokemons;
  switch(type) {
    case GET_POKEMONS:
      return{
        ...state,
        pokemons: payload,
        allPokemons: payload
      };
    case POST_POKEMON:
      return{
        ...state,
        //allPokemons:
      };
    case GET_POKEMONS_BY_NAME:
      return{
        ...state,
        pokemons: payload
      }
    case GET_TYPES:
      const typeOrdered = payload.sort(function (a, b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        return 0;})
      return{
        ...state,
        types: typeOrdered
      };
    case FILTER_BY_TYPE:
      const statusFiltered = payload === 'all' 
        ? allPokemons
        : allPokemons.filter (e => e.type.includes(payload));

      return{
        ...state,
        pokemons: statusFiltered
      };
    case FILTER_BY_ORIGIN:
      const originFiltered = payload === 'created' 
        ? allPokemons.filter (e => e.created)
        : allPokemons.filter (e => !e.created);

      return{
        ...state,
          pokemons: payload === 'all' 
            ? allPokemons
            : originFiltered
      };
    case SORT_BY_ORDER:
      switch (payload) {
        case 'asc':
          console.log("Entre 1");
          state.pokemons.sort(function (a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            return 0;
          });
          break;
        case 'dsc':
          console.log("Entre 2");
          state.pokemons.sort(function (a, b) {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
            return 0;
          });
          break;
        case 'hp':
          state.pokemons.sort(function (a, b) {
            if (a.hp < b.hp) return 1;
            if (a.hp > b.hp) return -1;
            return 0;
          })
          break;
        default:
          state.pokemons.sort(function (a, b) {
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
            return 0;
          })
          break;
     }
      return{
        ...state,
          pokemons: state.pokemons
      };

    default: return {...state};
  }
}

export default reducer;