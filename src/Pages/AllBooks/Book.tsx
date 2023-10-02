import React from "react";
import imge from '../../assets/images/book.jpg';
const Book = ({ book }) => {
    const{Title, Author, Genre, PublicationYear} = book;

  return (
    <div>
      <div className="text-center max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <p>
          <img
            className="rounded-t-lg"
            src={imge}
            alt=""
          />
        </p>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
             {Title}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {Author}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {Genre}
          </p>
          <p className="mb-3 font-bold text-gray-700 dark:text-gray-400">
            {PublicationYear}
          </p>
   
        </div>
      </div>
    </div>
  );
};

export default Book;
