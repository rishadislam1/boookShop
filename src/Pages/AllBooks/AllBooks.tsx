import { useGetBooksQuery } from "../../Redux/feature/books/bookApi";
import Book from "./Book";
import "react-rangeslider/lib/index.css";
import React, {useState} from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { setPublicationYear, setSearchItem } from "../../Redux/feature/books/bookSlice";

const AllBooks = () => {
  const { data } = useGetBooksQuery(undefined);
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();
  const { publicationYear } = useAppSelector((state) => state.book);
  const handleSome = (e: { target: { value: any } }) => {
    dispatch(setPublicationYear(e.target.value));
  };


  // const searchItem = useAppSelector(state=>state.book)
 
  let bookData;
  if (publicationYear > 0) {
    bookData = data?.data?.filter(
      (item: { PublicationYear: number }) =>
        item.PublicationYear < publicationYear
    );
  } 

  else {
    bookData = data?.data;
  }
  return (
    <div className="mt-20 flex gap-10">
      <div>
        <div>
          <p>Search Here</p>
          <input type="search" name="" id="" className="ml-1 rounded-xl mt-2 mb-5 w-full" placeholder="search with title, author, or genre" onChange={(e)=>setSearch(e.target.value)} />
        </div>
        <div>
          <p>Sort your book based on publication year</p>
          {/* <Horizontal></Horizontal> */}
          <input
            type="range"
            className="w-full"
            min={"1814"}
            max={"2023"}
            defaultValue={"2023"}
            onChange={handleSome}
          />
          <p>{publicationYear}</p>
        </div>
      </div>

      <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {bookData?.filter(item=>{
          return search.toLowerCase() === ''? item: item.Author.toLowerCase().includes(search) || item.Title.toLowerCase().includes(search) || item.Genre.toLowerCase().includes(search) || item.PublicationYear.toString().toLowerCase().includes(search) ;
        }).map((book) => (
          <Book key={book._id} book={book}></Book>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
