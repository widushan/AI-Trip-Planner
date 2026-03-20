import React from 'react'
import { Link } from 'react-router-dom'





function Hotels({ trip }) {


    return (

        <div>
            <h2 className='font-bold text-xl mt-5'>Hotel Recommendations</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5'>
                {trip?.tripData?.travel_plan?.hotel_options?.map((hotel, index) => (
                    <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.hotelName + ',' + hotel?.hotelAddress} target='_blank'>
                        <div key={index} className='cursor-pointer hover:scale-105 transition-all'>
                            <img src={hotel.hotelImageUrl} className='w-full h-[180px] object-cover rounded-xl' alt="hotel" />
                            <div className='my-2 flex flex-col gap-2'>
                                <h2 className='font-medium'>{hotel?.hotelName}</h2>
                                <h2 className='text-xs text-gray-600'>📍{hotel?.hotelAddress}</h2>
                                <h2 className='text-sm text-gray-600'>💰{hotel?.price}</h2>
                                <h2 className='text-sm text-gray-600'>⭐{hotel?.rating}</h2>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>

    )

}



export default Hotels