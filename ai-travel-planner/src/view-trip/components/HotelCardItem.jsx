import { getPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'




function HotelCardItem({ hotel }) {


    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        hotel && GetPlacePhoto()
    }, [hotel])

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: hotel?.hotelName
        }
        const result = await getPlaceDetails(data).then(resp => {
            const photoRef = resp.data.places[0].photos[3].name
            const photoUrl = PHOTO_REF_URL.replace('{NAME}', photoRef)
            setPhotoUrl(photoUrl)
        })
    }


    return (


        <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName + ',' + hotel?.hotelAddress} target='_blank'>
            <div className='cursor-pointer hover:scale-105 transition-all'>
                <img src={photoUrl} className='w-full h-[180px] object-cover rounded-xl' alt="hotel" />
                <div className='my-2 flex flex-col gap-2'>
                    <h2 className='font-medium'>{hotel?.hotelName}</h2>
                    <h2 className='text-xs text-gray-600'>📍{hotel?.hotelAddress}</h2>
                    <h2 className='text-sm text-gray-600'>💰{hotel?.price}</h2>
                    <h2 className='text-sm text-gray-600'>⭐{hotel?.rating}</h2>
                </div>
            </div>
        </Link>


    )


}

export default HotelCardItem