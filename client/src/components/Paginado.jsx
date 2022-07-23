import React from "react";

const Paginado = ({pokemonsPerPage, allPokemons, paginado}) =>{
 const pageNumbers = [];

 for (let i = 0; i <= Math.ceil(allPokemons/pokemonsPerPage); i++) {
  pageNumbers.push(i+1);
 }
 return(
    <nav>
      <ul className="Paginado">
        { pageNumbers && pageNumbers.map(n => (
          <li className="Number" key={n}>
            <a onClick={() => paginado(n)}>{n}</a>
          </li>
        ))}
      </ul>
    </nav>
 )
}

export default Paginado;