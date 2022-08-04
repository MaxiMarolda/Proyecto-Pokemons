import React from "react";

const Paginado = ({pokemonsPerPage, dispPokemons, paginado, currentPage}) =>{
  const pageNumbers = [];
  const pageTotal = Math.ceil(dispPokemons/pokemonsPerPage);

  for (let i = 1; i <= pageTotal; i++) {
    pageNumbers.push(i);
  };

  function handleOnClick (e) {
    if (e.target.name === "less" && currentPage > 1) paginado(currentPage-1);
    if (e.target.name === "more" && currentPage < pageTotal) paginado(currentPage+1);
  };
  
  return(
    <nav className="Paginado">
       <button onClick={(e) => handleOnClick(e)} name="less" >{"<<"}</button>
        {/* {console.log(`total de páginas ${pageTotal}`)} */}
        { pageNumbers && pageNumbers.map(n => (
          <span className="Number" key={n}>
            <button onClick={() => paginado(n)}>{n}</button>
          </span>
        ))}
      <button onClick={(e) => handleOnClick(e)} name="more" >{">>"}</button>
    </nav>
  )
}

export default Paginado;