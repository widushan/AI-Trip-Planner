import React, { useEffect, useState } from 'react'
import { getPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import { Link } from 'react-router-dom';



function UserTripCardItem({ trip }) {

    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        trip && GetPlacePhoto()
    }, [trip])

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label
        }
        const result = await getPlaceDetails(data).then(resp => {
            const photoRef = resp.data.places[0].photos[3].name
            const photoUrl = PHOTO_REF_URL.replace('{NAME}', photoRef)
            setPhotoUrl(photoUrl)
        })
    }


    return (

        <Link to={'/view-trip/' + trip?.id}>
            <div className='hover:scale-105 transition-all cursor-pointer'>
                <img src={photoUrl} alt="" className="w-full h-[200px] object-cover rounded-xl" />

                <div className='my-5 flex flex-col gap-2'>
                    <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
                    <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} Budget </h2>
                    <h2 className='text-sm text-gray-500'>{trip?.userSelection?.traveler} Travelers</h2>
                </div>

            </div>
        </Link>

    )

}


export default UserTripCardItem