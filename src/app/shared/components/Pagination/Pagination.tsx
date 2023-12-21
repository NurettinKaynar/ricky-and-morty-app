import React, { useState } from "react";

export interface InfoModel {
  count: number;
  next?: string;
  pages: number;
  prev?: string;
}

interface PaginationProps {
  info: InfoModel;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ info, onPageChange }) => {
  const { count, pages, prev, next } = info;
  const [activePage, setActivePage] = useState(1);

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= pages && page !== activePage) {
      setActivePage(page);
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageNumbersToShow = 10;

    if (pages <= maxPageNumbersToShow) {
      for (let i = 1; i <= pages; i++) {
        pageNumbers.push(renderPageNumber(i));
      }
    } else {
      // Eğer aktif sayfa 6 veya daha küçükse, ellipsisi sayfa 10'dan sonra göster
      if (activePage <= 6) {
        for (let i = 1; i <= 7; i++) {
          pageNumbers.push(renderPageNumber(i));
        }
        pageNumbers.push(renderEllipsis());
        for (let i = pages - 1; i <= pages; i++) {
          pageNumbers.push(renderPageNumber(i));
        }
      } else {
        // Eğer aktif sayfa 6'dan büyükse, ellipsisi her iki tarafında göster
        for (let i = 1; i <= 2; i++) {
          pageNumbers.push(renderPageNumber(i));
        }
        pageNumbers.push(renderEllipsis());
        for (let i = activePage - 2; i <= activePage + 2; i++) {
          pageNumbers.push(renderPageNumber(i));
        }
        pageNumbers.push(renderEllipsis());
        for (let i = pages - 1; i <= pages; i++) {
          pageNumbers.push(renderPageNumber(i));
        }
      }
    }

    return pageNumbers;
  };

  const renderPageNumber = (pageNumber: number) => (
    <a
      key={pageNumber}
      href="#"
      onClick={() => handlePageClick(pageNumber)}
      className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold 
        ${
          activePage === pageNumber
            ? "bg-indigo-600 text-white"
            : "text-white-900 hover:bg-gray-50 hover:text-gray-400"
        }
      `}>
      {pageNumber}
    </a>
  );

  const renderEllipsis = () => (
    <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-white-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
      ...
    </span>
  );

  return (
    <div className="flex items-center justify-between px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-white-700">
            Showing <span className="font-medium">{activePage}</span> to{" "}
            <span className="font-medium">20</span> of{" "}
            <span className="font-medium">{info.count}</span> results{" "}
          </p>
        </div>
      </div>
      <div className=" flex flex-1 items-center justify-between">
        {activePage > 1 && (
          <a
            href="#"
            onClick={() => handlePageClick(activePage - 1)}
            className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
              activePage === 1 ? "cursor-not-allowed" : ""
            }`}>
            <span className="sr-only">Previous</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        )}
        {renderPageNumbers()}
        {activePage < pages && (
          <a
            href="#"
            onClick={() => handlePageClick(activePage + 1)}
            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-white-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-gray-400 focus:z-20 focus:outline-offset-0 ${
              activePage === pages ? "cursor-not-allowed" : ""
            }`}>
            <span className="sr-only">Next</span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
};

export default Pagination;
