// import React from "react";
// import "./css/Pagination.css"; // Adjust the path as needed

// const Pagination = ({ page, totalPages, onPageChange }) => {
//   if (totalPages <= 1) return null;

//   return (
//     <div className="pagination">
//       <button
//         disabled={page === 1}
//         onClick={() => onPageChange(page - 1)}
//         className="user-pagination-btn"
//       >
//         ⬅ Prev
//       </button>
//       <span className="user-pagination-text">
//         Page {page} of {totalPages}
//       </span>
//       <button
//         disabled={page === totalPages}
//         onClick={() => onPageChange(page + 1)}
//         className="user-pagination-btn"
//       >
//         Next ➡
//       </button>
//     </div>
//   );
// };

// export default Pagination;









import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "./css/Pagination.css";

const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
  maxVisiblePages = 5,
}) => {
  if (totalPages <= 1) return null;

  const generatePageNumbers = () => {
    const pages = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = startPage + maxVisiblePages - 1;

      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = endPage - maxVisiblePages + 1;
      }

      for (let i = startPage; i <= endPage; i++) pages.push(i);
    }

    return pages;
  };

  return (
    <div className="pagination">
      {/* <div className="pagination-info">
        Page {currentPage} of {totalPages} • {totalItems} total orders
      </div> */}

      <div className="pagination-buttons">
        <button
          className="user-pagination-btn"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <FiChevronLeft />
        </button>

        {/* {generatePageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            className={`pagination-btn ${currentPage === pageNum ? "active" : ""}`}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </button>
        ))} */}

        <span className="user-pagination-text">
         Page {currentPage} of {totalPages}
        </span>

        <button
          className="user-pagination-btn"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
