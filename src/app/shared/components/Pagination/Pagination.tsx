import { InfoModel } from '@/app/core/models/Info.model'
import React, { useState } from 'react'
interface PaginationProps {
    info: InfoModel;
    onPageChange: (page: number) => void;
  }
  

const Pagination:React.FC<PaginationProps> = ({info,onPageChange}) => {



    const [activePage, setActivePage] = useState(1);

    const handlePageClick = (page:number) => {
      setActivePage(page);
      onPageChange(page);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
    
        for (let i = 1; i <= info.pages; i++) {
          pageNumbers.push(
            <a
              key={i}
              href="#"
              onClick={() => handlePageClick(i)}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold 
                ${activePage === i ? 'bg-indigo-600 text-white' : 'text-white-900 hover:bg-gray-50 hover:text-gray-400'}
              `}
            >
              {i}
            </a>
          );
        }
    
        return pageNumbers;
      };

      return (
        <div className="flex items-center justify-between border-t px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <a href="#" onClick={() => handlePageClick(activePage - 1)} className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${activePage === 1 ? 'cursor-not-allowed' : ''}`}>
            Previous
          </a>
          <a href="#" onClick={() => handlePageClick(activePage + 1)} className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ${activePage === info.pages ? 'cursor-not-allowed' : ''}`}>
            Next
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-white-700">
              Showing {" "}
              <span className="font-medium">{(activePage - 1) * 20 + 1}</span>
              {" "}to {" "}
              <span className="font-medium">{Math.min(activePage * 20, info.count)}</span>
              {" "}of {" "}
              <span className="font-medium">{info.count}</span>
              {" "}results
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <a href="#" onClick={() => handlePageClick(activePage - 1)} className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${activePage === 1 ? 'cursor-not-allowed' : ''}`}>
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
              </a>
              {renderPageNumbers()}
              <a href="#" onClick={() => handlePageClick(activePage + 1)} className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-white-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-gray-400 focus:z-20 focus:outline-offset-0 ${activePage === info.pages ? 'cursor-not-allowed' : ''}`}>
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </a>
            </nav>
          </div>
        </div>
      </div>
      );
    };

export default Pagination