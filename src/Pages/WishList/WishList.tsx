import React from 'react';
import { useAppSelector } from '../../Redux/hook';
import { useDeletewishlistMutation, useGetWishlistQuery } from '../../Redux/feature/books/bookApi';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const WishList = () => {
    const user = useAppSelector(state=>state.user);
    const navigate = useNavigate();

    const userEmail = user?.user?.email;

    

    const { data } = useGetWishlistQuery({},{
        refetchOnMountOrArgChange: true,
        pollingInterval: 3000,
        refetchOnReconnect: true,
        refetchOnFocus: true
        
      });

      const mainWishlist = data?.data?.filter(dt=>dt.userEmail === userEmail);

      const [deletewishlist] = useDeletewishlistMutation();


  const handleDelete = (id)=>{
   
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                deletewishlist(id)
                .then(()=>{
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                      )
                      navigate('/wishlist')
                })
         
            }
          })
    

  }


  
    return (
        <div>
            <h1 className='text-4xl font-bold mt-10'>Your listed Books:</h1>

{
    mainWishlist?.map(wishItem=><><h1 className='text-2xl mt-5'>Title: {wishItem.name} <button onClick={()=>handleDelete(wishItem._id)} className='bg-red-500 rounded-xl text-white px-5 py-2 ml-10 '>Delete</button> <Link to={`/bookdetails/${wishItem._id}`} className='bg-green-500 rounded-xl text-white px-5 py-2 ml-10 '>Check Details</Link>  </h1><br/></>)
}
          
        </div>
    );
};

export default WishList;