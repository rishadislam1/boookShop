import React from "react";
import { useAppSelector } from "../../Redux/hook";
import {
  useAddBooksMutation,
  useGetBooksQuery,
  useUpdateBooksMutation,
} from "../../Redux/feature/books/bookApi";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBooks = () => {
  const { id } = useParams();
  const user = useAppSelector((state) => state.user);



  const [updateBooks] = useUpdateBooksMutation();

  const { data: book } = useGetBooksQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: 3000,
      refetchOnReconnect: true,
      refetchOnFocus: true,
    }
  );

  const newBook = book?.data?.filter(book1=>book1?._id===id)

const navigate = useNavigate()
  console.log()
  const userEmail = user?.user?.email;

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const author = form.author.value;
    const genre = form.genre.value;
    let publication1 = form.publication.value;
    const publication = parseInt(publication1);
    const book = {Title: title, Author: author, Genre:genre, PublicationYear: publication, UserEmail: userEmail}
  

    updateBooks({id,book})
    .then(()=>{
        Swal.fire(
            'Good job!',
            'Your Book Updated successfully!',
            'success'
          )
          navigate('/allbook')
    })
    
  };


  return (
    <div>
      <form onSubmit={handleUpdate} className="flex flex-col justify-center">
        <div className="flex justify-center items-center gap-10 mt-5">
          <label htmlFor="title1">Title</label>
          <input type="text" name="title" id="title1" defaultValue={newBook[0].Title} />
        </div>
        <div className="flex justify-center items-center gap-10 mt-5">
          <label htmlFor="title1">Author</label>
          <input type="text" name="author" id="title1" defaultValue={newBook[0].Author} />
        </div>
        <div className="flex justify-center items-center gap-10 mt-5">
          <label htmlFor="title1">Genre</label>
          <input type="text" name="genre" id="title1" defaultValue={newBook[0].Genre}/>
        </div>
        <div className="flex justify-center items-center gap-10 mt-5">
          <label htmlFor="title1">Publication Date</label>
          <input type="text" name="publication" id="title1" defaultValue={newBook[0].PublicationYear} />
        </div>
        <div className="flex justify-center items-center gap-10 mt-5">
          <input
            type="submit"
            value="Update Book"
            className="mt-7 px-5 py-2 rounded-xl bg-blue-500 text-white cursor-pointer"
          />
        </div>{" "}
      </form>
    </div>
  );
};

export default UpdateBooks;
