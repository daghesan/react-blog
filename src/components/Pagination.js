export default function Pagination({totalPages, currentPage, min, max, nPages, onPageChange, onPrevClick, onNextClick}) {
  
  const pages = []
    for(let i=1 ; i<=totalPages; i++){
    pages.push(i);
  }

  const handlePageClick = (e) => {
    onPageChange(Number(e.target.id));
  }
  const handlePrevClick = ()=>{
    onPrevClick();
  }
  const handleNextClick = ()=>{
    onNextClick();
  }

  return (
        <div className="pagination">
            {currentPage < nPages+1 ? "" : <a className='page-link' onClick={handlePrevClick}>vorige pagina &laquo;</a>}

            {currentPage > nPages ? 
            <div className='first-page'>
              <a key={1} id={1} onClick={handlePageClick} 
              className={currentPage===1 ? 'active-page' : null}>
              {1}
              </a> 
              <p>...</p>
            </div>  
              : ""}

            { pages ? (
                pages.map(page => {
                    if(page <= max  && page > min) {
                        return(
                    <a key={page} id={page} onClick={handlePageClick} 
                        className={currentPage===page ? 'active-page' : null}>
                        {page}
                    </a>)
                    }else{
                        return null;
                    }
                }
                )
            ) : ""      
            }
            
            {currentPage <= totalPages - nPages ? 
            <div className='last-page'>
              <p>...</p>
              <a key={totalPages} id={totalPages} onClick={handlePageClick} 
              className={currentPage===totalPages ? 'active-page' : null}>
              {totalPages}
              </a> 
            </div>  
              : ""}

            {currentPage > totalPages - nPages ? "" 
            :
            <a className='page-link' onClick={handleNextClick}>volgende pagina &raquo;</a>
            }
        </div>
  )
}