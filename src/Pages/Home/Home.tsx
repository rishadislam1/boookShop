import React from 'react';
import imge from '../../assets/images/book.jpg';
import { useAppSelector } from '../../Redux/hook';
import { useGetFinishQuery } from '../../Redux/feature/books/bookApi';

const Home = () => {
    const user = useAppSelector(state=>state.user);

    const userEmail = user?.user?.email;

    const {data} = useGetFinishQuery({},{
        refetchOnMountOrArgChange: true,
        pollingInterval: 3000,
        refetchOnReconnect: true,
        refetchOnFocus: true})
        
        const mainData = data?.data?.filter(dt=>dt.userEmail===userEmail)
        console.log(mainData)
    return (
        <div>
            <h1 className='mt-10 text-4xl font-bold'>Your finished read book</h1>
    <div className='flex flex-wrap justify-around'>
    {
                mainData?.map(finish=><>   <div className="text-center max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mt-10">
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
                     {finish.title}
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {finish.author}
                  </p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {finish.genre}
                  </p>
                  <p className="mb-3 font-bold text-gray-700 dark:text-gray-400">
                    {finish.publicationYear}
                  </p>
          
        
                </div>
              </div></>)
            }
    </div>
         
        </div>
    );
};

export default Home;