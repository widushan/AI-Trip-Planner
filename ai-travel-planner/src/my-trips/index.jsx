import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigation } from 'react-router-dom';
import UserTripCardItem from './components/UserTripCardItem';



function MyTrips() {

    const navigation = useNavigation();

    const [userTrips, setUserTrips] = useState([]);

    useEffect(() => {
        GetUserTrips();
    }, [])



    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            navigation('/');
            return;
        }

        const q = query(collection(db, "AITrips"), where("userEmail", "==", user?.email));
        const querySnapshot = await getDocs(q);

        const trips = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            trips.push(doc.data());
        });

        setUserTrips(trips);
    }




    return (

        <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>My Trips</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-10'>
                {userTrips?.length > 0 ? userTrips.map((trip, index) => (
                    <UserTripCardItem trip={trip} key={index} />
                )) :
                    [1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
                        <div key={index} className='h-[200px] bg-gray-200 rounded-xl animate-pulse'></div>
                    ))
                }
            </div>

        </div>

    )

}


export default MyTrips