import { Button } from '@/components/ui/button'
import { getPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';


function PlaceCardItem({ activity }) {


    const [photoUrl, setPhotoUrl] = useState();

    useEffect(() => {
        activity && GetPlacePhoto()
    }, [activity])

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: activity?.placeName
        }
        const result = await getPlaceDetails(data).then(resp => {
            const photoRef = resp.data.places[0].photos[3].name
            const photoUrl = PHOTO_REF_URL.replace('{NAME}', photoRef)
            setPhotoUrl(photoUrl)
        })
    }




    return (


        <Link to={'https://www.google.com/maps/search/?api=1&query=' + activity?.placeName} target='_blank'>
            <div className='border rounded-xl p-5 hover:scale-105 transition-all cursor-pointer'>
                <img src={photoUrl} alt="place" className='w-full h-48 object-cover rounded-xl' />
                <h2 className='font-medium text-lg'>{activity?.placeName}</h2>
                <h2 className='text-sm text-gray-500 mt-1'>⏱️ Time to travel: {activity?.timeToSpend}</h2>
                <h2 className='text-sm text-gray-500 mt-1'>💰 {activity?.ticketPricing}</h2>
                <h2 className='text-sm text-gray-500 mt-1'>⭐ {activity?.rating}</h2>
                <h2 className='text-sm text-gray-500 mt-1'>{activity?.placeDetails}</h2>
            </div>
        </Link>


    )
}

export default PlaceCardItem