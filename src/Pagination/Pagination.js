import ReactPaginate from "react-paginate";
function Pagination({ pageCount, activePage, handlePageClick }) {
  return (
    <>
      {pageCount > 1 ? (
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          breakLabel={"..."}
          initialSelected={activePage}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      ) : (
        ""
      )}
    </>
  );
}

export default Pagination;
