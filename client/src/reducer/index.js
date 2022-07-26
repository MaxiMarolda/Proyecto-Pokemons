
const initialState = {
  pokemons : [],
  allPokemons : [],
  types: []
}

function reducer (state= initialState, action){
  const allPokemons = state.allPokemons;
  switch(action.type) {
    case 'GET_POKEMONS':
      return{
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload
      };
    case 'GET_TYPES':
      return{
        ...state,
        types: action.payload
      };
    case 'FILTER_BY_TYPE':
      const statusFiltered = action.payload === 'all' 
        ? allPokemons
        : allPokemons.filter (e => e.types.includes(action.payload));

      return{
        ...state,
        pokemons: statusFiltered
      };
      case 'FILTER_BY_ORIGIN':
            const originFiltered = action.payload === 'exis' 
        ? allPokemons.filter (e => !e.created)
        : allPokemons.filter (e => e.created);

      return{
        ...state,
        pokemons: action.payload === 'all' 
        ? allPokemons
        : originFiltered
      };
    default: return {...state};
  }
}

export default reducer;