import React from "react";
import { useParams } from "react-router-dom";
import { useGetCommentQuery, usePostCommentMutation, useSingleBookQuery } from "../../Redux/feature/books/bookApi";
import Swal from "sweetalert2";
import { useAppSelector } from "../../Redux/hook";

const BookDetails = () => {
  const { id } = useParams();

  const { data: book } = useSingleBookQuery(id);

  const user  = useAppSelector(state=>state.user)

  const { data } = useGetCommentQuery(id, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });

  console.log(book?.UserEmail===user?.user?.email)
  console.log()
  const[postComment] = usePostCommentMutation();

  const handleComment = (e)=>{
    e.preventDefault();
    const form = e.target;
    const comment = form.comment.value;

    const options = {
        id: id,
        data: { comment: comment },
      };

      postComment(options)
      .then(data=>{
        Swal.fire(
            'Good job!',
            `${data.data.message}`,
            'success'
          )
      })
      form.reset();
    
  }

  return (
    <div>
    <div className="flex justify-around">
    <div className="flex flex-col justify-center items-center mt-10">
        <h1 className="mt-5 font-bold text-2xl">Here Is you book details</h1>
        <h1 className="mt-5 font-bold text-xl">
          <u>Title</u>: {book?.Title}
        </h1>
        <h1 className="mt-5 font-bold text-xl">
          <u>Author</u>: {book?.Author}
        </h1>
        <h1 className="mt-5 font-bold text-xl">
          <u>Genre</u>: {book?.Genre}
        </h1>
        <h1 className="mt-5 font-bold text-xl">
          <u>Publication Date</u>: {book?.PublicationYear}
        </h1>
      </div>
      <div className="mt-28">
        <button className="px-10 py-2 text-white bg-green-500 rounded-xl">Edit</button> <br /> <br />
        <button className="px-10 py-2 text-white bg-red-500 rounded-xl">Delete</button>
      </div>
    </div>
      {/* comment */}
      <form className="mt-10" onSubmit={handleComment}>
        <textarea name="comment" id="" cols="30" className="w-1/2 lg:ml-3 rounded-xl" placeholder="write your review for this book"></textarea><br /> <br />
       {
        user.user.email? <button className="bg-blue-500 text-white ml-3 py-2 px-5 rounded-xl">Comment</button>:
        "Login for comment"
       }
      </form>

      <div>
      <h1 className={"mt-5 font-bold text-xl user?"}>
          Comments
        </h1>
        {/* <p className="flex items-center gap-10 mt-5 mb-20 ml-3">
<div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
</div>
{book?.comments?.map(comment=><div>comment</div>)}</p> */}

<div className="mt-10">
        {data?.comments?.map((comment: string, index: number) => (
          <div key={index} className="flex gap-3 items-center mb-5">
           <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
</div>
            <p>{comment}</p>
          </div>
        ))}
      </div>

      </div>
    </div>
  );
};

export default BookDetails;
