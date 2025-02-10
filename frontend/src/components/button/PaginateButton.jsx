import ReactPaginate from "react-paginate";
import {BsChevronLeft, BsChevronRight} from "react-icons/bs";

const PaginateButton = () => {
  return (
    <div>
       <ReactPaginate
        breakLabel="..."
        nextLabel={
            <span className="w-10 h-10 flex items-center justify-center bg-lightGray rounded-md">
                <BsChevronRight />
            </span>
        }
        // onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={50}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </div>
  )
}

export default PaginateButton
