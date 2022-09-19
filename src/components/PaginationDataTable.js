import React from 'react'



function PaginationDataTable({pages, setCurrentPage, currentPage}) {

   

    return (
    <div className='pagination'>
        {
            pages.map((a, b) => (
                <button key={b} onClick={() => setCurrentPage(a)} className={a == currentPage ? "active" : ''}>
                    {a}
                </button>
            ))
        }
    </div>
    )
}

export default React.memo(PaginationDataTable)