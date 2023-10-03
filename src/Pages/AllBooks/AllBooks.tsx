import { useGetBooksQuery } from "../../Redux/feature/books/bookApi";
import Book from "./Book";
import "react-rangeslider/lib/index.css";
import React, {useState} from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/hook";
import { setPublicationYear, setSearchItem } from "../../Redux/feature/books/bookSlice";
import { Link } from "react-router-dom";

const AllBooks = () => {
  const { data } = useGetBooksQuery({},{
    refetchOnMountOrArgChange: true,
    pollingInterval: 3000,
    refetchOnReconnect: true,
    refetchOnFocus: true
    
  });


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
     
        item.PublicationYear <= publicationYear   
    );
  } 

  else {
 
    bookData = data?.data;
  }
  
  return (
   <div>
  
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
            max={"2024"}
            defaultValue={publicationYear}
            onChange={handleSome}
          />
          <p>{publicationYear}</p>
        </div>

        <div>
          <Link to='/addnewbook'> <button className="mt-7 w-full py-2 bg-blue-500 rounded-xl text-white">Add New Book</button>
    </Link> 
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
   </div>
  );
};

export default AllBooks;
