import React from "react";
import { useAppSelector } from "../../Redux/hook";
import { useAddBooksMutation } from "../../Redux/feature/books/bookApi";
import Swal from "sweetalert2";

const AddNewBook = () => {
    const user  = useAppSelector(state=>state.user)

    const [addBooks, data] = useAddBooksMutation();
// console.log(data)
    const userEmail = user?.user?.email;
    const handleBook = (e)=>{
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const author = form.author.value;
        const genre = form.genre.value;
        let publication1 = form.publication.value;
        const publication =  parseInt(publication1);
        const book = {Title: title, Author: author, Genre:genre, PublicationYear: publication, UserEmail: userEmail}
        addBooks(book)
        .then(data=>{
            if(data?.data?.acknowledged === true){
                Swal.fire(
                    'Good job!',
                    'Your Book Added successfully!',
                    'success'
                  )
            }
        })

       
    }
  return (
    <div>
      <form onSubmit={handleBook} className="flex flex-col justify-center">
        <div className="flex justify-center items-center gap-10 mt-5">
          <label htmlFor="title1">Title</label>
          <input type="text" name="title" id="title1" />
        </div>
        <div className="flex justify-center items-center gap-10 mt-5">
          <label htmlFor="title1">Author</label>
          <input type="text" name="author" id="title1" />
        </div>
        <div className="flex justify-center items-center gap-10 mt-5">
          <label htmlFor="title1">Genre</label>
          <input type="text" name="genre" id="title1" />
        </div>
        <div className="flex justify-center items-center gap-10 mt-5">
          <label htmlFor="title1">Publication Date</label>
          <input type="text" name="publication" id="title1" />
        </div>
        <div className="flex justify-center items-center gap-10 mt-5">
          <input
            type="submit"
            value="Add Book"
            className="mt-7 px-5 py-2 rounded-xl bg-blue-500 text-white cursor-pointer"
          />
        </div>{" "}
      </form>
    </div>
  );
};

export default AddNewBook;
