import React from "react";

const Paginado = ({pokemonsPerPage, allPokemons, paginado}) =>{
  const pageNumbers = [];
  const pageTotal = Math.ceil(allPokemons/pokemonsPerPage);

  for (let i = 1; i <= pageTotal; i++) {
    pageNumbers.push(i);
  }
 
  return(
    <nav className="Paginado">
      {/* {console.log(`total de páginas ${pageTotal}`)} */}
        { pageNumbers && pageNumbers.map(n => (
          <span className="Number" key={n}>
            <button onClick={() => paginado(n)}>{n}</button>
          </span>
        ))}
    </nav>
  )
}

export default Paginado;