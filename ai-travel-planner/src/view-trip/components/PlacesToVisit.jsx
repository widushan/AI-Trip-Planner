import React from 'react'
import PlaceCardItem from './PlaceCardItem';




function PlacesToVisit({ trip }) {


    return (

        <div>
            <h2 className='font-bold text-lg mt-5'>Places to Visit</h2>
            <div>
                {trip?.tripData?.travel_plan?.itinerary && (
                    Array.isArray(trip.tripData.travel_plan.itinerary) ? trip.tripData.travel_plan.itinerary : Object.entries(trip.tripData.travel_plan.itinerary).map(([dayKey, dayDetails]) => ({
                        day: dayDetails.day || dayKey,
                        activities: dayDetails.activities || [],
                        ...dayDetails
                    }))
                )
                    .sort((a, b) => {
                        const strA = a.day ? a.day.toString() : "";
                        const strB = b.day ? b.day.toString() : "";
                        return strA.localeCompare(strB, undefined, { numeric: true });
                    })
                    .map((item, index) => (
                        <div key={index} className='mt-5'>
                            <h2 className='font-medium text-lg capitalize'>
                                {item.day}
                                {(item.bestTimeToVisit || item.bestTime || item.timeToVisit) && (
                                    <span className='text-sm text-gray-500 ml-2'>
                                        (Best Time to Visit: {item.bestTimeToVisit || item.bestTime || item.timeToVisit})
                                    </span>
                                )}
                            </h2>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-4'>
                                {item.activities && Array.isArray(item.activities) && item.activities.map((activity, actIndex) => (
                                    <div key={actIndex} className='p-3'>
                                        {(activity?.bestTimeToVisit || activity?.bestTime || activity?.timeToVisit) && (
                                            <h2 className='font-medium text-sm text-orange-600 mb-1'>
                                                Best Time to Visit: {activity?.bestTimeToVisit || activity?.bestTime || activity?.timeToVisit}
                                            </h2>
                                        )}

                                        <PlaceCardItem activity={activity} />

                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
            </div>
        </div>

    )

}



export default PlacesToVisit